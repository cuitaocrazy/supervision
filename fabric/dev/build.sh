#!/usr/bin/env bash

. .env
. scripts/utils.sh

HR="-------------------------------"

function generateCAdockerComposeFile() {
  infoln "Generate 'docker compose' file"
  cat <<EOF >docker/docker-compose-ca.yaml
version: '3'

networks:
  test:
    name: fabric_test

services:

  ca:
    image: hyperledger/fabric-ca:latest
    labels:
      service: hyperledger-fabric
    environment:
      - FABRIC_CA_HOME=/etc/hyperledger/fabric-ca-server
      - FABRIC_CA_SERVER_CA_NAME=ca
      - FABRIC_CA_SERVER_TLS_ENABLED=true
      - FABRIC_CA_SERVER_PORT=7054
      - FABRIC_CA_SERVER_OPERATIONS_LISTENADDRESS=0.0.0.0:17054
    ports:
      - "7054:7054"
      - "17054:17054"
    command: sh -c 'fabric-ca-server start -b admin:adminpw -d'
    volumes:
      - ../organizations/fabric-ca/ca:/etc/hyperledger/fabric-ca-server
    container_name: ca
    networks:
      - test
EOF

}

infoln "受监管机构: $REGULATED_ORGS"
infoln "监管机构: $REGULATORY_ORGS"
infoln "金融机构: $FINANCIAL_ORGS"
infoln $HR

# for REGULATED_ORG in $REGULATED_ORGS; do
#   infoln "构建受监管机构: $REGULATED_ORG"
# done
generateCAdockerComposeFile