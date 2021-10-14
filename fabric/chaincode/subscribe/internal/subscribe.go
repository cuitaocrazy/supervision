package internal

import "strings"

type Subscribe struct {
	SubscribeID           string `json:"SubscribeID"`           // 订购合约ID（格式：监管机构ID.受监管机构ID.支付渠道ID.创建时的 USVOrderNo）
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
	Status                string `json:"Status"`                // 合约状态，有create/cancel/complete
}

const (
	SUBSCRIBE_STATUS_CREATE   = "create"   // 合约处于创建状态
	SUBSCRIBE_STATUS_CANCEL   = "cancel"   // 合约处于取消状态
	SUBSCRIBE_STATUS_COMPLETE = "complete" // 合约处于完成状态
)

func (subscribe *Subscribe) GetCollectionName() string {
	return strings.Join([]string{subscribe.USVOrgID, subscribe.BankID, subscribe.SVOrgID}, "-")
}
