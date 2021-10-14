package internal

import "strings"

// 订购合约的ID组成
type SubscribeID struct {
	USVOrgID   string // 受监管机构ID
	BankID     string // 支付渠道ID
	SVOrgID    string // 监管机构ID
	USVOrderNo string // 受监管机构订单号
}

// 分割字符串并返回实体对象
func NewSubscribeIDFromSubscribe(s Subscribe) SubscribeID {
	sub := SubscribeID{
		USVOrgID:   s.USVOrgID,
		BankID:     s.BankID,
		SVOrgID:    s.SVOrgID,
		USVOrderNo: s.USVOrderNo,
	}
	return sub
}

// 分割字符串并返回实体对象
func NewSubscribeIDFromString(subscribeID string) SubscribeID {
	ids := strings.SplitN(subscribeID, "-", 4)
	sub := SubscribeID{
		USVOrgID:   ids[0],
		BankID:     ids[1],
		SVOrgID:    ids[2],
		USVOrderNo: ids[3],
	}
	return sub
}

// 获取私有数据集合名称
func (s *SubscribeID) GetCollectionName() string {
	return strings.Join([]string{s.USVOrgID, s.BankID, s.SVOrgID}, "-")
}

// 是否是允许发起的客户端
func (s *SubscribeID) IsAllowClient(clientMSPID string) bool {
	return s.USVOrgID == clientMSPID || s.BankID == clientMSPID || s.SVOrgID == clientMSPID
}

// 获取 MSP_ID 的数组
func (s *SubscribeID) GetAarrayMSP() []string {
	return []string{s.USVOrgID, s.BankID, s.SVOrgID}
}

// 获取字符串格式的订购合约ID
func (s *SubscribeID) GetSubscribeIDString() string {
	return strings.Join([]string{s.USVOrgID, s.BankID, s.SVOrgID, s.USVOrderNo}, "-")
}
