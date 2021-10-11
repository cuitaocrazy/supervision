package internal

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// 监管合约
type SubscribeContract struct {
	contractapi.Contract
}

type Subscribe struct {
	SubscribeID           string `json:"SubscribeID"`           // 订购合约ID（格式：监管机构ID.受监管机构ID.支付渠道ID.创建时的TxnID）
	USVOrgID              string `json:"USVOrgID"`              // 受监管机构ID
	USVItemID             string `json:"USVItemID"`             // 受监管机构项目ID
	USVItemName           string `json:"USVItemName"`           // 受监管机构项目名称
	USVItemDesc           string `json:"USVItemDesc"`           // 受监管机构项目简介
	USVOrderNo            string `json:"USVOrderNo"`            // 受监管机构订单号
	BankID                string `json:"BankID"`                // 支付渠道ID
	BankTranID            string `json:"BankTranID"`            // 支付渠道交易流水号
	BankTranDate          string `json:"BankTranDate"`          // 支付渠道交易日期（格式：yyyyMMdd）
	BankTranTime          string `json:"BankTranTime"`          // 支付渠道交易时间（格式：HHmmss）
	PayerRemark           string `json:"PayerRemark"`           // 付款方备注
	PayerStub             string `json:"PayerStub"`             // 付款方存根
	TranAmt               int    `json:"TranAmt"`               // 交易金额（单位分）
	SVOrgID               string `json:"SVOrgID"`               // 监管机构ID
	SubscribeStartDate    string `json:"SubscribeStartDate"`    // 订购合约开始日期（格式：yyyyMMdd）
	SubscribeDurationDays int    `json:"SubscribeDurationDays"` // 订购合约持续天数
}

type SubscribeID struct {
	USVOrgID   string `json:"USVOrgID"`   // 受监管机构ID
	BankID     string `json:"BankID"`     // 支付渠道ID
	SVOrgID    string `json:"SVOrgID"`    // 监管机构ID
	USVOrderNo string `json:"USVOrderNo"` // 受监管机构订单号
}

// 订购合约
func (s *SubscribeContract) Create(ctx contractapi.TransactionContextInterface) (string, error) {
	// TODO 缺少数据完整性校验
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
	subscribeID := createSubscribeID(subscribe, ctx)
	subscribe.SubscribeID = subscribeID
	collectionName := getCollectionName(subscribe)
	valueBytes, err := json.Marshal(subscribe)
	if err != nil {
		return "", fmt.Errorf("序列化subscribe对象出错: %v", subscribe)
	}
	err = ctx.GetStub().PutPrivateData(collectionName, subscribeID, valueBytes)
	if err != nil {
		return "", fmt.Errorf("保存数据失败: %v", err)
	}
	return subscribeID, nil
}

// 合约取消
func (s *SubscribeContract) Cancel(ctx contractapi.TransactionContextInterface, subscribeID string) error {
	// TODO 待实现
	return nil
}

// 合约完成
func (s *SubscribeContract) Complete(ctx contractapi.TransactionContextInterface, subscribeID string) error {
	// TODO 待实现
	return nil
}

func splitSubscribeID(subscribeID string) SubscribeID {
	ids := strings.SplitN(subscribeID, "-", 4)
	sub := SubscribeID{
		USVOrgID:   ids[0],
		BankID:     ids[1],
		SVOrgID:    ids[2],
		USVOrderNo: ids[3],
	}
	return sub
}

func createSubscribeID(subscribe Subscribe, ctx contractapi.TransactionContextInterface) string {
	return strings.Join([]string{subscribe.USVOrgID, subscribe.BankID, subscribe.SVOrgID, subscribe.USVOrderNo}, "-")
}

func getCollectionName(subscribe Subscribe) string {
	return strings.Join([]string{subscribe.USVOrgID, subscribe.BankID, subscribe.SVOrgID}, "-")
}
