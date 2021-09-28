package main

import (
	"log"

	"github.com/cuitaocrazy/supervision/fabric/chaincode/subscribe/internal"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	assetChaincode, err := contractapi.NewChaincode(&internal.SubscribeContract{})
	if err != nil {
		log.Panicf("监管链码-----创建失败: %v", err)
	}

	if err := assetChaincode.Start(); err != nil {
		log.Panicf("监管链码-----启动失败: %v", err)
	}
}
