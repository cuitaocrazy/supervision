package internal

import "strings"

type SubscribeID struct {
	USVOrgID   string // 受监管机构ID
	BankID     string // 支付渠道ID
	SVOrgID    string // 监管机构ID
	USVOrderNo string // 受监管机构订单号
}

func splitSubscribeIDString(subscribeID string) SubscribeID {
	ids := strings.SplitN(subscribeID, "-", 4)
	sub := SubscribeID{
		USVOrgID:   ids[0],
		BankID:     ids[1],
		SVOrgID:    ids[2],
		USVOrderNo: ids[3],
	}
	return sub
}

func (s *SubscribeID) GetCollectionName() string {
	return strings.Join([]string{s.USVOrgID, s.BankID, s.SVOrgID}, "-")
}

func (s *SubscribeID) isAllowClient(clientMSPID string) bool {
	return s.USVOrgID == clientMSPID || s.BankID == clientMSPID || s.SVOrgID == clientMSPID
}
