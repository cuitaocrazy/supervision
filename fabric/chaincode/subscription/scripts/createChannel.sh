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

## Set the anchor peers for each org in the channel
# infoln "Setting anchor peer for org1..."
# setAnchorPeer bank
# infoln "Setting anchor peer for org2..."
# setAnchorPeer 2

successln "Channel '$CHANNEL_NAME' joined"
