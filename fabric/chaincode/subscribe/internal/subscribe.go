package internal

import "strings"

type Subscribe struct {
	SubscribeID           string `json:"SubscribeID"`                                            // 订购合约ID（格式：监管机构ID.受监管机构ID.支付渠道ID.创建时的 USVOrderNo）
	USVOrgID              string `json:"USVOrgID" validate:"required,alphanum"`                  // 受监管机构ID
	USVItemID             string `json:"USVItemID" validate:"required"`                          // 受监管机构项目ID
	USVItemName           string `json:"USVItemName" validate:"required"`                        // 受监管机构项目名称
	USVItemDesc           string `json:"USVItemDesc" validate:"required"`                        // 受监管机构项目简介
	USVOrderNo            string `json:"USVOrderNo" validate:"required,alphanum"`                // 受监管机构订单号
	BankID                string `json:"BankID" validate:"required,alphanum"`                    // 支付渠道ID
	BankTranID            string `json:"BankTranID" validate:"required"`                         // 支付渠道交易流水号
	BankTranDate          string `json:"BankTranDate" validate:"required,len=8"`                 // 支付渠道交易日期（格式：yyyyMMdd）
	BankTranTime          string `json:"BankTranTime" validate:"required,len=6"`                 // 支付渠道交易时间（格式：HHmmss）
	PayerRemark           string `json:"PayerRemark" validate:"required"`                        // 付款方备注
	PayerStub             string `json:"PayerStub" validate:"required"`                          // 付款方存根
	TranAmt               int    `json:"TranAmt" validate:"required,numeric,gt=0"`               // 交易金额（单位分）
	SVOrgID               string `json:"SVOrgID" validate:"required,alphanum"`                   // 监管机构ID
	SubscribeStartDate    string `json:"SubscribeStartDate" validate:"required,len=8"`           // 订购合约开始日期（格式：yyyyMMdd）
	SubscribeDurationDays int    `json:"SubscribeDurationDays" validate:"required,numeric,gt=0"` // 订购合约持续天数
	Status                string `json:"Status"`                                                 // 合约状态，有create/cancel/complete
}

const (
	SUBSCRIBE_STATUS_CREATE   = "create"   // 合约处于创建状态
	SUBSCRIBE_STATUS_CANCEL   = "cancel"   // 合约处于取消状态
	SUBSCRIBE_STATUS_COMPLETE = "complete" // 合约处于完成状态
)

func (subscribe *Subscribe) GetCollectionName() string {
	return strings.Join([]string{subscribe.USVOrgID, subscribe.BankID, subscribe.SVOrgID}, "-")
}
