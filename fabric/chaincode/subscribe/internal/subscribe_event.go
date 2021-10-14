package internal

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SubscribeEvent struct {
	SubscribeID string `json:"SubscribeID"` // 订购合约ID（格式：监管机构ID.受监管机构ID.支付渠道ID.创建时的 USVOrderNo）
}

type SubscribeEventType string

const (
	SUBSCRIBE_EVENT_TYPE_CREATE   SubscribeEventType = "create"
	SUBSCRIBE_EVENT_TYPE_CANCEL   SubscribeEventType = "cancel"
	SUBSCRIBE_EVENT_TYPE_COMPLETE SubscribeEventType = "complete"
)

func PushEvent(eventType SubscribeEventType, subscribeID SubscribeID, ctx contractapi.TransactionContextInterface) error {
	idstr := subscribeID.GetSubscribeIDString()
	eventJson := SubscribeEvent{
		SubscribeID: idstr,
	}
	dataBytes, err := json.Marshal(eventJson)
	if err != nil {
		return fmt.Errorf("合约[%v]事件[%v]序列化失败: %v", idstr, eventType, err)
	}
	err = ctx.GetStub().SetEvent(string(eventType)+"-"+idstr, dataBytes)
	if err != nil {
		return fmt.Errorf("合约[%v]事件[%v]发送失败: %v", idstr, eventType, err)
	}
	return nil

}
