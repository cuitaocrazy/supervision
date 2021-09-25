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

function r_e() {
  ORG=$1
  ORD_DOMAIN=${ORG}.${DOMAIN}
  ORG_DIR=$PWD/organizations/peerOrganizations/$ORD_DOMAIN

  infoln $PEER_DIR
  if [ ! -d $ORG_DIR ]; then
    PEER_DOMAIN=peer0.$ORD_DOMAIN
    PEER_DIR=$ORG_DIR/peers/$PEER_DOMAIN
    PEER=${ORG}peer0
    PEERPWD=${PEER}pw
    ADMIN_DOMAIN=Admin@$ORD_DOMAIN
    ADMIN_DIR=$ORG_DIR/users/$ADMIN_DOMAIN
    ADMIN=${ORG}admin
    ADMINPWD=${ADMIN}pw
    USER_DOMAIN=User1@$ORD_DOMAIN
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
      r_e $REGULATED_ORG
    done
    for REGULATORY_ORG in $REGULATORY_ORGS; do
      r_e $REGULATORY_ORG
    done
    for FINANCIAL_ORG in $FINANCIAL_ORGS; do
      r_e $FINANCIAL_ORG
    done
  fi
}

function up() {
  caUp
  registerEnroll
}

function caDown() {
  docker-compose -f docker/docker-compose-ca.yaml down -v --remove-orphans
  docker run --rm -v "$(pwd):/data" busybox sh -c 'rm -rf /data/organizations'
}

function down() {
  caDown

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