export interface Subscribe {
	SubscribeID: string // 订购合约ID 	
	USVOrgID: string // 受监管机构ID 	
	USVItemID: string // 受监管机构项目ID 
	USVItemName: string // 受监管机构项目名称 
	USVItemDesc: string // 受监管机构项目简介 
	USVOrderNo: string // 受监管机构订单号 
	BankID: string // 支付渠道ID 
	BankTranID: string // 支付渠道交易流水号 
	BankTranDate: string // 支付渠道交易日期（格式：yyyyMMdd） 
	BankTranTime: string // 支付渠道交易时间（格式：HHmmss） 
	PayerRemark: string // 付款方备注 
	PayerStub: string // 付款方存根 
	TranAmt: number // 交易金额（单位分） 
	SVOrgID: string // 监管机构ID 
	SubscribeStartDate: string // 订购合约开始日期（格式：yyyyMMdd） 
	SubscribeDurationDays: number // 订购合约持续天数 
	status: string
}

export interface SignInfo {
	appID: string
	sign: string
	nonse: string
}

export interface SubscribeWithSign extends Subscribe, SignInfo {  //继承接口Shape
}

