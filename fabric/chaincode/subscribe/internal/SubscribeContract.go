package internal

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// 监管合约
type SubscribeContract struct {
	contractapi.Contract
}

type Subscribe struct {
	SubscribeID           string // 订购合约ID
	USVOrgID              string // 受监管机构ID
	USVItemID             string // 受监管机构项目ID
	USVItemName           string // 受监管机构项目名称
	USVItemDesc           string // 受监管机构项目简介
	USVOrderNo            string // 受监管机构订单号
	BankID                string // 支付渠道ID
	BankTranID            string // 支付渠道交易流水号
	BankTranDate          string // 支付渠道交易日期（格式：yyyyMMdd）
	BankTranTime          string // 支付渠道交易时间（格式：HHmmss）
	PayerRemark           string // 付款方备注
	PayerStub             string // 付款方存根
	TranAmt               int    // 交易金额（单位分）
	SVOrgID               string // 监管机构ID
	SubscribeStartDate    string // 订购合约开始日期（格式：yyyyMMdd）
	SubscribeDurationDays int    // 订购合约持续天数
}

// 订购合约

func (s *SubscribeContract) Create(ctx contractapi.TransactionContextInterface) (string, error) {

	// TODO 待实现
	return "", nil
}

func (s *SubscribeContract) Cancel(ctx contractapi.TransactionContextInterface) error {
	// TODO 待实现
	return nil
}

func (s *SubscribeContract) Complete(ctx contractapi.TransactionContextInterface) error {
	// TODO 待实现
	return nil
}

func getCollectionName(ctx contractapi.TransactionContextInterface) (string, error) {
	// TODO
	return "", nil
}
