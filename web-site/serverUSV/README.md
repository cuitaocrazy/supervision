### 接口说明
输入输出结果均为JSON
#### 预下单接口 /buy  
方法：post
传入参数:
	USVItemID   string        受监管机构项目ID 
	USVItemName   string      受监管机构项目名称 
	USVItemDesc   string      受监管机构项目简介 
	PayerRemark   string      付款方备注 
	TranAmt   number          交易金额（单位分） 
输出:
codeUrl  string  二维码url
USVOrderNo  string  受监管机构订单号
	SubscribeStartDate   string    订购合约开始日期（格式：yyyyMMdd） 
	SubscribeDurationDays   number    订购合约持续天数 
	PayerStub   string        付款方存根 
	BankID      string        银行ID
	SVOrgID     string        监管机构ID
#### 撤销接口 /cancel
SubscribeID string SubscribeID 
输出:
result string 失败时为Fail,成功时为Success


