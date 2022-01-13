import { Subscribe } from './API';
let demoOrderInfo = {};//demo中模拟数据库中的保存信息

const mockSaveLocalDB = (orderInfo: Subscribe) => {
  demoOrderInfo[orderInfo.BankTranID] = orderInfo
}

const mockgetLocalDB = (bankTranID:string) => {
  console.log(demoOrderInfo)
  return demoOrderInfo[bankTranID]
}

const yuanToFen = (tranAmtYuan: string | number) => {
  if (typeof tranAmtYuan === 'number') {
    return tranAmtYuan * 100
  } else {
    return parseFloat(tranAmtYuan) * 100
  }
}
export {mockSaveLocalDB,mockgetLocalDB}