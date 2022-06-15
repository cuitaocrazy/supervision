#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh
export DEV_PATH=${PWD}/../../dev
export PATH=${DEV_PATH}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config
export CC_NAME=supervision
export CC_SRC_PATH=${PWD}
export CC_RUNTIME_LANGUAGE=node
export CC_VERSION='0.0.1'
export CC_SEQUENCE=1
export CC_END_POLICY=""
export CC_COLL_CONFIG="--collections-config ${PWD}/collections.json"
export PACKAGE_ID=""
export CORE_PEER_TLS_ENABLED=true
export PEER_ROOT_PATH=${DEV_PATH}/organizations/peerOrganizations
export INIT_REQUIRED="--init-required"
export CHANNEL_NAME="edb-supervision-channel"
export ORDERER_CA=${DEV_PATH}/organizations/ordererOrganizations/yadadev.com/orderers/orderer.yadadev.com/msp/tlscacerts/tlsca.yadadev.com-cert.pem
export ORDERER_ADMIN_TLS_SIGN_CERT=${DEV_PATH}/organizations/ordererOrganizations/yadadev.com/orderers/orderer.yadadev.com/tls/server.crt
export ORDERER_ADMIN_TLS_PRIVATE_KEY=${DEV_PATH}/organizations/ordererOrganizations/yadadev.com/orderers/orderer.yadadev.com/tls/server.key

# Set environment variables for the peer org
setGlobals() {
  local USING_ORG=$1
  local PEER_MSP_ID=''
  local PEER_NAME=''
  local PEER_PORT=0
  println "use env $USING_ORG"
  if [ $USING_ORG == 'bank' ]; then
    PEER_MSP_ID="BankMSP"
    PEER_NAME='bank'
    PEER_PORT=7051
  elif [ $USING_ORG == 'edb' ]; then
    PEER_MSP_ID="EdbMSP"
    PEER_NAME='edb'
    PEER_PORT=7151
  elif [ $USING_ORG == 'edu1' ]; then
    PEER_MSP_ID="Edu1MSP"
    PEER_NAME='edu1'
    PEER_PORT=7251
  elif [ $USING_ORG == 'edu2' ]; then
    PEER_MSP_ID="Edu2MSP"
    PEER_NAME='edu2'
    PEER_PORT=7351
  else
    fatalln "set global env has a error parameter$USING_ORG"
    exit -1
  fi
  export CORE_PEER_LOCALMSPID=$PEER_MSP_ID
  export CORE_PEER_TLS_ROOTCERT_FILE=${PEER_ROOT_PATH}/$PEER_NAME.yadadev.com/peers/peer0.$PEER_NAME.yadadev.com/tls/ca.crt
  export CORE_PEER_MSPCONFIGPATH=${PEER_ROOT_PATH}/$PEER_NAME.yadadev.com/users/Admin@$PEER_NAME.yadadev.com/msp
  export CORE_PEER_ADDRESS=localhost:$PEER_PORT
  export CORE_PEER_PORT=$PEER_PORT
  export CORE_PEER_NAME=$PEER_NAME
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}
