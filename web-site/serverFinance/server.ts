// import * as express from 'express';
// import * as bodyParser from 'body-parser';
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
// const uuidv4 = require('uuid')
import { v4 } from 'uuid'
import { SubscribeWithSign, Subscribe } from './API';
import { verify } from 'jws'
import * as cc from './ccClientService/financeClient'

const app = express()
const port = 3001
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();

app.use(express.static('public'))
const demoQrUrl = "http://localhost:3001/pay"

let demoOrderInfo = {};//demo中模拟数据库中的保存信息

app.post('/pay', jsonParser, async (req, res) => { //todo 进行支付 
  const subscribeId = await cc.createSubscribe(req.body)
  if (subscribeId === "FAIL") {
    res.send(500)
  } else {
    res.send({ "result": subscribeId })
  }
})

app.get('/pay', jsonParser, async (req, res) => { //二维码扫码后返回信息
  const { bankTranId, USVOrderNo, BankID, SVOrgID } = req.query
  const orderInfo = demoOrderInfo[bankTranId]
  orderInfo.USVOrderNo = USVOrderNo
  orderInfo.BankID = BankID
  orderInfo.SVOrgID = SVOrgID
  res.send({ "result": orderInfo })
})



app.post('/preOrder', jsonParser, (req, res) => {
  const verifySignResult = verifySign(req.body)
  if (!verifySignResult) {
    res.status(401).send("签名错误")//签名错误
    return;
  }
  const tradeNo = geneTradeNo()
  const PayerStub = genePayerStub()
  mockSaveLocalDB({ ...req.body, ...{ "BankTranId": tradeNo, PayerStub: PayerStub, "BankTranDate": moment(Date.now()).format('YYYYMMDD'), "BankTranTime": moment(Date.now()).format('HHmmss') } })
  res.send({ "codeUrl": demoQrUrl, "BankTranId": tradeNo })
})

const mockSaveLocalDB = (orderInfo: Subscribe) => {
  demoOrderInfo[orderInfo.BankTranID] = orderInfo
}




const geneTradeNo = () => { //获取预订单号
  return v4()
}

const genePayerStub = () => { //获取存根
  return v4()
}



const getKey = (appId: string) => { //获取key
  return "abcdef"
}


const verifySign = (body: SubscribeWithSign) => { //验证签名
  if (body.sign == null || body.appID == null) {
    return false
  }
  const key = getKey(body.appID);
  return verify(body.sign, 'HS256', key)
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


