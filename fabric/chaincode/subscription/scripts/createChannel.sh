#!/bin/bash

# imports
. scripts/envVar.sh
. scripts/utils.sh

CHANNEL_NAME="$1"
DELAY="$2"
MAX_RETRY="$3"
VERBOSE="$4"
: ${CHANNEL_NAME:="edb-supervision-channel"}
: ${DELAY:="3"}
: ${MAX_RETRY:="5"}
: ${VERBOSE:="false"}

export BLOCKFILE="./channel-artifacts/${CHANNEL_NAME}.block"

if [ ! -d "channel-artifacts" ]; then
	# 目录不存在，创建目录
	mkdir channel-artifacts
fi

createChannelGenesisBlock() {
	which configtxgen
	if [ "$?" -ne 0 ]; then
		fatalln "configtxgen tool not found."
	fi
	set -x
	configtxgen \
		-profile YadaDevOrgsApplicationGenesis \
		-outputBlock ${BLOCKFILE} \
		-channelID $CHANNEL_NAME
	res=$?
	{ set +x; } 2>/dev/null
	verifyResult $res "Failed to generate channel configuration transaction..."
}

createChannel() {

	# Poll in case the raft leader is not set yet
	local rc=1
	local COUNTER=1
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ]; do
		sleep $DELAY
		set -x
		osnadmin channel join --channelID $CHANNEL_NAME \
			--config-block ./channel-artifacts/${CHANNEL_NAME}.block \
			-o localhost:7053 \
			--ca-file "$ORDERER_CA" \
			--client-cert "$ORDERER_ADMIN_TLS_SIGN_CERT" \
			--client-key "$ORDERER_ADMIN_TLS_PRIVATE_KEY"
		res=$?
		{ set +x; } 2>/dev/null
		let rc=$res
		COUNTER=$(expr $COUNTER + 1)
	done
	verifyResult $res "Channel creation failed"
}

# joinChannel ORG
joinChannel() {
	# FABRIC_CFG_PATH=$PWD/../config/
	local USING_ORG=$1
	setGlobals $USING_ORG
	local rc=1
	local COUNTER=1
	## Sometimes Join takes time, hence retry
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ]; do
		sleep $DELAY
		set -x
		peer channel join -b $BLOCKFILE
		res=$?
		{ set +x; } 2>/dev/null
		let rc=$res
		COUNTER=$(expr $COUNTER + 1)
	done
	verifyResult $res "After $MAX_RETRY attempts, peer0.${USING_ORG} has failed to join channel '$CHANNEL_NAME' "
}

fetchConfig() {
	infoln "抓取通道最新的配置块"
	set -x
	peer channel fetch config config_block.pb \
		-o localhost:7050 \
		--ordererTLSHostnameOverride orderer.yadadev.com \
		-c $CHANNEL_NAME \
		--tls \
		--cafile "$ORDERER_CA"
	{ set +x; } 2>/dev/null
}

decodeConfigBlock2Json() {
	local OUTPUT="./myconfig.json"
	infoln "解析配置到JSON格式的文件 ${OUTPUT}"
	set -x
	configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
	jq .data.data[0].payload.data.config config_block.json >"${OUTPUT}"
	{ set +x; } 2>/dev/null
}

addAnchorConfig() {
	local INPUT="./myconfig.json"
	local OUTPUT="./mynewconfig.json"
	local HOST="peer0.${CORE_PEER_NAME}.yadadev.com"
	local PORT=$CORE_PEER_PORT
	infoln "新配置文件追加anchor配置"
	set -x
	# Modify the configuration to append the anchor peer 
	jq '.channel_group.groups.Application.groups.'${CORE_PEER_LOCALMSPID}'.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "'$HOST'","port": '$PORT'}]},"version": "0"}}' ${INPUT} > ${OUTPUT}
	{ set +x; } 2>/dev/null
}

createConfigUpdate() {
  local CHANNEL=$CHANNEL_NAME
  local ORIGINAL="./myconfig.json"
  local MODIFIED="./mynewconfig.json"
  local OUTPUT="./myanchor.tx"
  infoln "生成配置更新文件"
  set -x
  configtxlator proto_encode --input "${ORIGINAL}" --type common.Config --output original_config.pb
  configtxlator proto_encode --input "${MODIFIED}" --type common.Config --output modified_config.pb
  configtxlator compute_update --channel_id "${CHANNEL}" --original original_config.pb --updated modified_config.pb --output config_update.pb
  configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
  echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . >config_update_in_envelope.json
  configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output "${OUTPUT}"
  { set +x; } 2>/dev/null
}

updateAnchorPeer() {
  peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer.yadadev.com -c $CHANNEL_NAME -f myanchor.tx --tls --cafile "$ORDERER_CA" >&log.txt
  res=$?
  cat log.txt
  verifyResult $res "锚节点更新失败"
  successln "在通道 '$CHANNEL_NAME' 为机构 '${CORE_PEER_LOCALMSPID}' 设置锚节点成功"
}
setAnchorPeer() {
	local USING_ORG=$1
	local OUTPUT=myconfig.json
	setGlobals $USING_ORG
	fetchConfig
	decodeConfigBlock2Json
	addAnchorConfig
	createConfigUpdate
	updateAnchorPeer
	
}

listChannel() {
	println "尝试列出渠道 ${CHANNEL_NAME}"
	local LIST_RESULT="$(osnadmin channel list --channelID $CHANNEL_NAME \
			-o localhost:7053 \
			--ca-file $ORDERER_CA \
			--client-cert $ORDERER_ADMIN_TLS_SIGN_CERT \
			--client-key $ORDERER_ADMIN_TLS_PRIVATE_KEY 2>&1)"
	println "${LIST_RESULT}"
	if [[ ${LIST_RESULT} == "Status: 200"* ]] ;
	then
		return 0
	else
		return 1
	fi
}

## 生成初始快文件
if [ ! -f ${BLOCKFILE} ]; then
	# 渠道链码不存在则创建
	infoln "生成该渠道初始区块文件 ${BLOCKFILE}。"
	createChannelGenesisBlock
	else 
	infoln "该渠道区块文件 ${BLOCKFILE} 已存在，不重复生成文件。"
fi



## 创建渠道
listChannel 
if [[ $? -eq 0 ]]; then
	# 渠道存在
	infoln "渠道已存在，跳过创建渠道。"
else
	# 渠道不存在，执行创建
	infoln "渠道 ${CHANNEL_NAME} 不存在，开始新建"
	createChannel
	successln "渠道 '$CHANNEL_NAME' 创建完毕"
fi

# Join all the peers to the channel
infoln "Joining bank peer to the channel..."
joinChannel bank
infoln "Joining edb peer to the channel..."
joinChannel edb
infoln "Joining edu1 peer to the channel..."
joinChannel edu1
infoln "Joining edu2 peer to the channel..."
joinChannel edu2

# # Set the anchor peers for each org in the channel
infoln "Setting anchor peer for bank..."
setAnchorPeer bank
# infoln "Setting anchor peer for other..."
setAnchorPeer edb
setAnchorPeer edu1
setAnchorPeer edu2

successln "Channel '$CHANNEL_NAME' joined"
