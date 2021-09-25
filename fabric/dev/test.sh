#!/bin/bash
docker run --rm -d --name ca \
  -e FABRIC_CA_HOME=/etc/hyperledger/fabric-ca-server \
  -e FABRIC_CA_SERVER_CA_NAME=ca-org1 \
  -e FABRIC_CA_SERVER_TLS_ENABLED=true \
  -e FABRIC_CA_SERVER_PORT=7054 \
  -e FABRIC_CA_SERVER_OPERATIONS_LISTENADDRESS=0.0.0.0:17054 \
  -p 7054:7054 \
  -p 17054:17054 \
  -v ${PWD}/organizations/fabric-ca/org1:/etc/hyperledger/fabric-ca-server \
  hyperledger/fabric-ca \
  sh -c 'fabric-ca-server start -b admin:adminpw -d'
