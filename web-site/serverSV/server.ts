// import * as express from 'express';
// import * as bodyParser from 'body-parser';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cc from './ccClientService/SVClient'

const app = express()
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

app.put('/query', jsonParser, async (req, res) => { 
  // const subscribeId = await cc.querySubscribe("EdbMSP", req.body.SubscribeID)
  // if (subscribeId === "FAIL") {
  //   res.send(500)
  // } else {
  //   res.send({ "result": subscribeId })
  // }
  res.send({ "orderList": demoOrderList,USVList:demoUSVList })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
