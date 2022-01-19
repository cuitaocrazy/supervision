import { Subscribe } from './API';

let demoOrderInfo = {};//demo中模拟数据库中的保存信息

const mockSaveLocalDB = (orderInfo: Subscribe) => {
  demoOrderInfo[orderInfo.BankTranID] = orderInfo
  console.log(demoOrderInfo)
}

const mockgetLocalDBByID = (bankTranID:string) => {
  return demoOrderInfo[bankTranID]
}

const mockgetLocalDB = () => {
  const resultArray = []
  var keys = Object.keys(demoOrderInfo);
  keys.forEach(key=>resultArray.push(demoOrderInfo[key]))
  return resultArray
}


// const yuanToFen = (tranAmtYuan: string | number) => {
//   if (typeof tranAmtYuan === 'number') {
//     return tranAmtYuan * 100
//   } else {
//     return parseFloat(tranAmtYuan) * 100
//   }
// }
export {mockSaveLocalDB,mockgetLocalDB,mockgetLocalDBByID}