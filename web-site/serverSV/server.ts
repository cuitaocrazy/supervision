// import * as express from 'express';
// import * as bodyParser from 'body-parser';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cc from './ccClientService/SVClient'
import {mockgetLocalDB} from './mockDb'
import * as cors from 'cors'
const app = express()
app.use(cors());
const port = 3003
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();


const demoOrderList = [
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-123456","USVOrderNo":"123456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-223456","USVOrderNo":"223456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-323456","USVOrderNo":"323456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-423456","USVOrderNo":"423456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
  {"SubscribeID":"Edu1MSP-BankMSP-EdbMSP-523456","USVOrderNo":"523456","SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2020年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"},
]

const demoUSVList = [
  {USVOrgID:'Edu1MSP',name:'灵纳教育'},
  {USVOrgID:'Edu2MSP',name:'测试机构'}
]


app.use(express.static('public'))

app.put('/cancel', jsonParser, async (req, res) => { //todo 进行支付 
  console.log('clean')
  console.log('do something on cc')
  console.log(req.body.SubscribeID)
  const result = await cc.cleanSubscribe("EdbMSP", req.body.SubscribeID)
  if (result === "FAIL") {
    res.send(500)
  } else {
    res.send({ "result": result })
  }
})

app.put('/complete', jsonParser, async (req, res) => { //todo 进行支付 
  console.log('complete')
  const subscribeId = await cc.completeSubscribe("EdbMSP", req.body.SubscribeID)
  if (subscribeId === "FAIL") {
    res.send(500)
  } else {
    res.send({ "result": subscribeId })
  }
})

//todo remove
// app.put('/query', jsonParser, async (req, res) => { 
//   const {USVOrgID,SubscribeStartDate} = req.body
//   const orderList = mockgetLocalDB()
//   res.send({ "orderList": orderList,USVList:demoUSVList })
// })

app.get('/query', jsonParser, async (req, res) => { 
  const {USVOrgID,SubscribeStartDate} = req.query
  const orderList = mockgetLocalDB()
  orderList.map(order=>{order.TranAmt=fenToYuan(order.TranAmt)})
  res.send({ "orderList": orderList,USVList:demoUSVList })
})

app.get('/querySum', jsonParser, async (req, res) => { 
  const {USVOrgID,SubscribeStartDateStart,SubscribeStartDateEnd} = req.query
  const orderList = mockgetLocalDB()
  const sumObject = orderList.filter((order)=>{
    if(USVOrgID==''){
      return true
    }
    if(USVOrgID===order.USVOrgID){
      return true
    }
    return false
  }).reduce((previousValue,order)=>{
    if(previousValue[order.USVOrgID]==undefined){
      const TranSumAmt = fenToYuan(order.TranAmt)
      const TranCount = 1
      previousValue[order.USVOrgID]={TranSumAmt:TranSumAmt,TranCount:TranCount}
    }else{
      const TranSumAmt = order.TranAmt+fenToYuan(previousValue[order.USVOrgID].TranSumAmt)
      const TranCount = 1+previousValue[order.USVOrgID].TranCount
      previousValue[order.USVOrgID]={TranSumAmt:TranSumAmt,TranCount:TranCount}
    }

    return previousValue
  },[])

  const sumList = []
  var keys = Object.keys(sumObject);
  keys.forEach(key=>sumList.push({...{"USVOrgID":key},...sumObject[key]}))
  res.send({ "sumList": sumList,USVList:demoUSVList })
})

cc.listenPayResult("Edu1MSP")


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//todo
const fenToYuan = (tranAmtFen: string | number) => {
  if (typeof tranAmtFen === 'number') {
    return tranAmtFen 
  } else {
    return parseFloat(tranAmtFen) 
  }
}
