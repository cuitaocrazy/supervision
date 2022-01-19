export interface Order {
  SubscribeID:string,
  USVOrgID?: string,
  USVItemID?: string,
  USVItemName?: string,
  USVItemDesc?: string,
  PayerRemark?: string,
  TranAmt: number,
  USVOrderNo:string,
  SubscribeDurationDays:number,
  BankID:string,
  BankTranID:string,
  BankTranDate:string,
  BankTranTime:string,
  PayerStub?:string,
  SVOrgID:string,
  SubscribeStartDate:string,
}
export interface TranSum{
  USVOrgID?: string,
  USVOrgName?:string,
  USVItemID?: string,
  USVItemName?: string,
  TranCount?: number,
  TranSumAmt?: number,
  TranMonth?:string,
}

export interface TranMonitor{
  USVOrgID: string,
  USVOrgName?:string,
  DisbursedAmt?:number,
  NotDisbursedAmt?:number,
  date?:string
}
