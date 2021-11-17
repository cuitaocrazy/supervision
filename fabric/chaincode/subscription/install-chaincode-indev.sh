#!/bin/bash

# . scripts/createChannel.sh
. scripts/envVar.sh
. scripts/utils.sh
packageChaincode() {
    npm install
    npm run build
    set -x
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} \
        --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${CC_VERSION} >&log.txt

    { set +x; } 2>/dev/null
}

installChaincode() {
    setGlobals $1
    set -x
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    local res=$?
    { set +x; } 2>/dev/null
    verifyResult $res "install chaincode to peer[$1] failed. "
    successln "install chaincode to peer [$1] success. "
}

queryInstalled() {
    setGlobals $1
    set -x
    peer lifecycle chaincode queryinstalled >&log.txt
    res=$?
    { set +x; } 2>/dev/null
    cat log.txt
    PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
    verifyResult $res "Query installed on peer[${1}] has failed"
    println "Query installed successful on peer[${1}] on channel"
}

approveForMyOrg() {
    # setGlobals $1
    set -x
    peer lifecycle chaincode approveformyorg -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.yadadev.com \
        --tls \
        --cafile "$ORDERER_CA" \
        --channelID $CHANNEL_NAME \
        --name ${CC_NAME} \
        --version ${CC_VERSION} --package-id ${PACKAGE_ID} \
        --sequence ${CC_SEQUENCE} ${INIT_REQUIRED} ${CC_END_POLICY} ${CC_COLL_CONFIG}
    res=$?
    { set +x; } 2>/dev/null
    verifyResult $res "Chaincode definition approved on orderer on channel '$CHANNEL_NAME' failed"
    successln "Chaincode definition approved on orderer on channel '$CHANNEL_NAME'"
}

# packageChaincode

# installChaincode "bank1"
# installChaincode "edb"
# installChaincode "edu1"
# installChaincode "edu2"

queryInstalled "bank1"
approveForMyOrg
