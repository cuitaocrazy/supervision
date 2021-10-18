package internal

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// 监管合约
type SubscribeContract struct {
	contractapi.Contract
}

// 订购合约
func (s *SubscribeContract) Create(ctx contractapi.TransactionContextInterface) (string, error) {
	// TODO 缺少重复检查
	transientMap, err := ctx.GetStub().GetTransient()
	if err != nil {
		return "", fmt.Errorf("获取私有临时区数据失败: %v", err)
	}
	subscribeBytes, ok := transientMap["Subscribe"]
	if !ok {
		return "", fmt.Errorf("临时区缺少数据 Subscribe: %v", err)
	}
	var subscribe Subscribe
	err = json.Unmarshal(subscribeBytes, &subscribe)
	if err != nil {
		return "", fmt.Errorf("无法将临时区的数据反序列化成对象: %v", err)
	}
	validate := GetValidate()
	err = validate.Struct(subscribe)
	if err != nil {
		return "", fmt.Errorf("字段格式不正确: %v", err)
	}
	clientMSPID, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return "", fmt.Errorf("无法获取请求者客户端的MSPID: %v", err)
	}
	if subscribe.BankID != clientMSPID {
		return "", fmt.Errorf("创建合约只能由匹配的支付渠道发起。")
	}
	serverMSPID, err := shim.GetMSPID()
	if err != nil {
		return "", fmt.Errorf("无法获取服务器的MSPID: %v", err)
	}
	if !((subscribe.USVOrgID == serverMSPID) || (subscribe.BankID == serverMSPID) || (subscribe.SVOrgID == serverMSPID)) {
		return "", fmt.Errorf("背书节点必须和报文中的相应节点对应。")
	}
	subscribeID := NewSubscribeIDFromSubscribe(subscribe)
	subscribeIDString := subscribeID.GetSubscribeIDString()
	subscribe.SubscribeID = subscribeIDString
	subscribe.Status = SUBSCRIBE_STATUS_CREATE
	collectionName := subscribe.GetCollectionName()
	valueBytes, err := json.Marshal(subscribe)
	if err != nil {
		return "", fmt.Errorf("序列化subscribe对象出错: %v", subscribe)
	}
	err = ctx.GetStub().PutPrivateData(collectionName, subscribeIDString, valueBytes)
	if err != nil {
		return "", fmt.Errorf("保存数据失败: %v", err)
	}
	err = PushEvent(SUBSCRIBE_EVENT_TYPE_CREATE, subscribeID, ctx)
	if err != nil {
		return subscribeIDString, fmt.Errorf("合约[%v]推送事件失败: %v", subscribeIDString, err)
	}
	return subscribeIDString, nil
}

// 合约取消
func (s *SubscribeContract) Cancel(ctx contractapi.TransactionContextInterface) error {
	transient, err := ctx.GetStub().GetTransient()
	if err != nil {
		return fmt.Errorf("合约取消时无法获取合约ID: %v", err)
	}
	subscribeIDBytes, ok := transient["SubscribeID"]
	if !ok {
		return fmt.Errorf("合约取消时缺少域[SubscribeID]")
	}
	subscribeIDString := string(subscribeIDBytes)
	clientMSP, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return fmt.Errorf("合约[%v]无法判断发起者", subscribeIDString)
	}
	subID := NewSubscribeIDFromString(subscribeIDString)
	if subID.SVOrgID != clientMSP {
		return fmt.Errorf("合约[%v]撤销的发起者只能是被监管机构，当前的机构是[%v]", subscribeIDString, clientMSP)
	}
	collectionName := subID.GetCollectionName()
	dataBytes, err := ctx.GetStub().GetPrivateData(collectionName, subscribeIDString)
	if err != nil {
		return fmt.Errorf("从集合[%v]中获取数据[%v]", collectionName, subscribeIDString)
	}
	var sub Subscribe
	err = json.Unmarshal(dataBytes, &sub)
	if err != nil {
		return fmt.Errorf("合约[%v]数据无法反序列化", subscribeIDString)
	}
	if sub.Status != SUBSCRIBE_STATUS_CREATE {
		return fmt.Errorf("合约[%v]状态[%v]不是[%v]", subscribeIDString, sub.Status, SUBSCRIBE_STATUS_CREATE)
	}
	sub.Status = SUBSCRIBE_STATUS_CANCEL
	valueBytes, err := json.Marshal(sub)
	if err != nil {
		return fmt.Errorf("合约[%v]无法序列化", err)
	}
	err = ctx.GetStub().PutPrivateData(collectionName, subscribeIDString, valueBytes)
	if err != nil {
		return fmt.Errorf("合约[%v]完成无法更新数据: %v", subscribeIDString, err)
	}
	err = PushEvent(SUBSCRIBE_EVENT_TYPE_CANCEL, subID, ctx)
	if err != nil {
		return fmt.Errorf("合约[%v]推送事件失败: %v", subscribeIDString, err)
	}
	return nil
}

// 合约完成
func (s *SubscribeContract) Complete(ctx contractapi.TransactionContextInterface) error {
	transient, err := ctx.GetStub().GetTransient()
	if err != nil {
		return fmt.Errorf("合约取消时无法获取合约ID: %v", err)
	}
	subscribeIDBytes, ok := transient["SubscribeID"]
	if !ok {
		return fmt.Errorf("合约取消时缺少域[subscribeID]")
	}
	subscribeIDString := string(subscribeIDBytes)
	clientMSP, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return fmt.Errorf("合约[%v]无法判断发起者", subscribeIDString)
	}
	subID := NewSubscribeIDFromString(subscribeIDString)
	if subID.SVOrgID != clientMSP {
		return fmt.Errorf("合约[%v]完成的发起者只能是监管机构，当前的机构是[%v]", subscribeIDString, clientMSP)
	}
	collectionName := subID.GetCollectionName()
	dataBytes, err := ctx.GetStub().GetPrivateData(collectionName, subscribeIDString)
	if err != nil {
		return fmt.Errorf("从集合[%v]中获取数据[%v]", collectionName, subscribeIDString)
	}
	var sub Subscribe
	err = json.Unmarshal(dataBytes, &sub)
	if err != nil {
		return fmt.Errorf("合约[%v]数据无法反序列化", subscribeIDString)
	}
	if sub.Status != SUBSCRIBE_STATUS_CREATE {
		return fmt.Errorf("合约[%v]状态[%v]不是[%v]", subscribeIDString, sub.Status, SUBSCRIBE_STATUS_CREATE)
	}
	sub.Status = SUBSCRIBE_STATUS_COMPLETE
	valueBytes, err := json.Marshal(sub)
	if err != nil {
		return fmt.Errorf("合约[%v]无法序列化", err)
	}
	err = ctx.GetStub().PutPrivateData(collectionName, subscribeIDString, valueBytes)
	if err != nil {
		return fmt.Errorf("合约[%v]无法完成更新操作: %v", subscribeIDString, err)
	}
	err = PushEvent(SUBSCRIBE_EVENT_TYPE_COMPLETE, subID, ctx)
	if err != nil {
		return fmt.Errorf("合约[%v]推送事件失败: %v", subscribeIDString, err)
	}
	return nil
}

// 查询签约信息
func (s *SubscribeContract) Query(ctx contractapi.TransactionContextInterface, subscribeIDString string) (Subscribe, error) {
	clientMSPID, err := ctx.GetClientIdentity().GetMSPID()
	var subscribe Subscribe
	if err != nil {
		return subscribe, fmt.Errorf("无法获取客户端的[MSPID]")
	}
	subID := NewSubscribeIDFromString(subscribeIDString)
	ok := subID.IsAllowClient(clientMSPID)
	if !ok {
		return subscribe, fmt.Errorf("合约[%v]查询发起的客户端[%v]错误", subscribeIDString, clientMSPID)
	}
	collectionName := subID.GetCollectionName()
	dataBytes, err := ctx.GetStub().GetPrivateData(collectionName, subscribeIDString)
	if err != nil {
		return subscribe, fmt.Errorf("合约[%v]查询不到:%v", subscribeIDString, err)
	}
	err = json.Unmarshal(dataBytes, &subscribe)
	if err != nil {
		return subscribe, fmt.Errorf("合约[%v]查询结果无法反序列化: %v", subscribeIDString, err)
	}
	return subscribe, nil
}
