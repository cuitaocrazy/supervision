#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/configtx
CADIR=organizations/fabric-ca/ca
. .env
. scripts/utils.sh

function removeUnwantedImages() {
  infoln "Removing generated chaincode docker images"
  docker image rm -f $(docker images -aq --filter reference='dev-peer*') 2>/dev/null || true
}

function caUp() {
  if [ ! -d "organizations/fabric-ca/ca" ]; then
    mkdir -p $CADIR
  fi
  docker-compose -f docker/docker-compose-ca.yaml up -d
}

function registerEnrollPeer() {
  ORG=$1
  ORG_DOMAIN=${ORG}.${DOMAIN}
  ORG_DIR=$PWD/organizations/peerOrganizations/$ORG_DOMAIN

  infoln $PEER_DIR
  if [ ! -d $ORG_DIR ]; then
    PEER_DOMAIN=peer0.$ORG_DOMAIN
    PEER_DIR=$ORG_DIR/peers/$PEER_DOMAIN
    PEER=${ORG}peer0
    PEERPWD=${PEER}pw
    ADMIN_DOMAIN=Admin@$ORG_DOMAIN
    ADMIN_DIR=$ORG_DIR/users/$ADMIN_DOMAIN
    ADMIN=${ORG}admin
    ADMINPWD=${ADMIN}pw
    USER_DOMAIN=User1@$ORG_DOMAIN
    USER_DIR=$ORG_DIR/users/$USER_DOMAIN
    USER=${ORG}user1
    USERPWD=${USER}pw

    fabric-ca-client register --caname ca --id.name $PEER --id.secret $PEERPWD --id.type peer --tls.certfiles "${PWD}/${CADIR}/tls-cert.pem"
    fabric-ca-client register --caname ca --id.name $ADMIN --id.secret $ADMINPWD --id.type admin --tls.certfiles "${PWD}/${CADIR}/tls-cert.pem"
    fabric-ca-client register --caname ca --id.name $USER --id.secret $USERPWD --id.type client --tls.certfiles "${PWD}/${CADIR}/tls-cert.pem"

    fabric-ca-client enroll -u https://$PEER:$PEERPWD@localhost:7054 --caname ca -M "$PEER_DIR/msp" --csr.hosts $PEER_DOMAIN --tls.certfiles "$PWD/$CADIR/tls-cert.pem"
    fabric-ca-client enroll -u https://$PEER:$PEERPWD@localhost:7054 --caname ca -M "$PEER_DIR/tls" --enrollment.profile tls --csr.hosts $PEER_DOMAIN --csr.hosts localhost --tls.certfiles "$PWD/$CADIR/tls-cert.pem"
    fabric-ca-client enroll -u https://$ADMIN:$ADMINPWD@localhost:7054 --caname ca -M "$ADMIN_DIR/msp" --tls.certfiles "$PWD/$CADIR/tls-cert.pem"
    fabric-ca-client enroll -u https://$USER:$USERPWD@localhost:7054 --caname ca -M "$USER_DIR/msp" --tls.certfiles "$PWD/$CADIR/tls-cert.pem"

    cp "$PEER_DIR/tls/tlscacerts/"* "$PEER_DIR/tls/ca.crt"
    cp "$PEER_DIR/tls/signcerts/"* "$PEER_DIR/tls/server.crt"
    cp "$PEER_DIR/tls/keystore/"* "$PEER_DIR/tls/server.key"

    mkdir -p "$ORG_DIR/msp/tlscacerts"
    cp "$PEER_DIR/tls/tlscacerts/"* "$ORG_DIR/msp/tlscacerts/ca.crt"

    mkdir -p "$ORG_DIR/tlsca"
    cp "$PEER_DIR/tls/tlscacerts/"* "$ORG_DIR/tlsca/tlsca.$ORG_DOMAIN-cert.pem"

    mkdir -p "$ORG_DIR/ca"
    cp "$PEER_DIR/msp/cacerts/"* "$ORG_DIR/ca/ca.$ORG_DOMAIN-cert.pem"
    echo 'NodeOUs:
  Enable: true
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca.pem
    OrganizationalUnitIdentifier: admin
' >"$PEER_DIR/msp/config.yaml"
  fi
}

function registerEnrollOrderer() {
  ORDERER=$1
  ORDERER_DOMAIN=${ORDERER}.${DOMAIN}
  ORDERER_DIR=$PWD/organizations/ordererOrganizations/$DOMAIN/orderers/$ORDERER_DOMAIN

  infoln $ORDERER_DIR
  if [ ! -d $ORDERER_DIR ]; then
    mkdir -p $ORDERER_DIR

    ORDERER=orderer
    ORDERER_PWD=${ORDERER_PWD}pw
    ADMIN_DOMAIN=Admin@$DOMAIN
    ADMIN_DIR=$ORDERER_DIR/users/$ADMIN_DOMAIN
    ADMIN=${ORDERER}admin
    ADMINPWD=${ADMIN}pw

    fabric-ca-client register --caname ca --id.name $ORDERER --id.secret $ORDERER_PWD --id.type orderer --tls.certfiles "${PWD}/${CADIR}/tls-cert.pem"
    fabric-ca-client register --caname ca --id.name $ADMIN --id.secret $ADMINPWD --id.type admin --tls.certfiles "${PWD}/${CADIR}/tls-cert.pem"

    fabric-ca-client enroll -u https://$ORDERER:$ORDERER_PWD@localhost:7054 --caname ca -M "$ORDERER_DIR/msp" --csr.hosts $ORDERER_DOMAIN --csr.hosts localhost --tls.certfiles "$PWD/$CADIR/tls-cert.pem"
    fabric-ca-client enroll -u https://$ORDERER:$ORDERER_PWD@localhost:7054 --caname ca -M "$ORDERER_DIR/tls" --enrollment.profile tls --csr.hosts $ORDERER_DOMAIN --csr.hosts localhost --tls.certfiles "$PWD/$CADIR/tls-cert.pem"
    fabric-ca-client enroll -u https://$ADMIN:$ADMINPWD@localhost:7054 --caname ca -M "$ADMIN_DIR/msp" --tls.certfiles "$PWD/$CADIR/tls-cert.pem"

    cp "$ORDERER_DIR/tls/tlscacerts/"* "$ORDERER_DIR/tls/ca.crt"
    cp "$ORDERER_DIR/tls/signcerts/"* "$ORDERER_DIR/tls/server.crt"
    cp "$ORDERER_DIR/tls/keystore/"* "$ORDERER_DIR/tls/server.key"

    mkdir -p "$ORDERER_DIR/msp/tlscacerts"
    cp "$ORDERER_DIR/tls/tlscacerts/"* "$ORDERER_DIR/msp/tlscacerts/tlsca.$DOMAIN-cert.pem"

    mkdir -p "$PWD/organizations/ordererOrganizations/$DOMAIN/msp/tlscacerts"
    cp "$ORDERER_DIR/tls/tlscacerts/"* "$PWD/organizations/ordererOrganizations/$DOMAIN/msp/tlscacerts/tlsca.$DOMAIN-cert.pem"
    echo 'NodeOUs:
  Enable: true
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca.pem
    OrganizationalUnitIdentifier: orderer
' >"$PWD/organizations/ordererOrganizations/$DOMAIN/orderers/orderer.yadadev.com/msp/config.yaml"
  fi
}

function registerEnroll() {
  MSP_DIR=organizations/admin
  export FABRIC_CA_CLIENT_HOME=${PWD}/${MSP_DIR}

  if [ ! -d $MSP_DIR ]; then
    sleep 1
    mkdir -p $MSP_DIR
    fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca --tls.certfiles "${PWD}/${CADIR}/tls-cert.pem"

    for REGULATED_ORG in $REGULATED_ORGS; do
      registerEnrollPeer $REGULATED_ORG
    done
    for REGULATORY_ORG in $REGULATORY_ORGS; do
      registerEnrollPeer $REGULATORY_ORG
    done
    for FINANCIAL_ORG in $FINANCIAL_ORGS; do
      registerEnrollPeer $FINANCIAL_ORG
    done

    registerEnrollOrderer orderer
  fi
}

function nodeUp() {
  docker-compose -f docker/docker-compose-test-net.yaml up -d
}

function nodeDown() {
  docker-compose -f docker/docker-compose-test-net.yaml down -v --remove-orphans
  rm -rf "system-genesis-block"
}

function up() {
  caUp
  registerEnroll
  nodeUp
}

function caDown() {
  docker-compose -f docker/docker-compose-ca.yaml down -v --remove-orphans
  docker run --rm -v "$(pwd):/data" busybox sh -c 'rm -rf /data/organizations'
}

function down() {
  caDown
  nodeDown
  removeUnwantedImages
}

function caStop() {
  docker-compose -f docker/docker-compose-ca.yaml stop
}

function stop() {
  caStop
}

if [ $1 == "up" ]; then
  up
elif [ $1 == "down" ]; then
  down
elif [ $1 == "stop" ]; then
  stop
fi
