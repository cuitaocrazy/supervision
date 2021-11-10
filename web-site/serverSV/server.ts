// import * as express from 'express';
// import * as bodyParser from 'body-parser';
const express = require('express')
const bodyParser = require('body-parser')
// const uuidv4 = require('uuid')
import { Subscribe } from './API';

import * as cc from './ccClientService/SVClient'

const app = express()
const port = 3003
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();

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

// const getItemBySubscribeId = (subscribeId: string) => {
//   const item: Subscribe = { "SubscribeDurationDays": 365, "TranAmt": 100, "USVOrgID": "Edu1MSP", "USVItemID": "1", "USVItemName": "系统架构师2021年下半年班", "USVItemDesc": "系统架构师2021年下半年及2022年上半年有效的培训课程", "USVOrderNo": "orderid0022", "BankID": "BankMSP", "BankTranID": "0000001", "BankTranDate": "20210929", "BankTranTime": "100130", "PayerRemark": "用于准备xx考试", "PayerStub": "付款凭证", "SVOrgID": "EdbMSP", "SubscribeStartDate": "20211030" }
//   return item
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const test = async (subscribeId: string) => {
//   const result = await cc.querySubscribe("EdbMSP", subscribeId)
//   console.log(result)
// }
// test("Edu1MSP-BankMSP-EdbMSP-orderid0032")























