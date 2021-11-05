// import * as express from 'express';
// import * as bodyParser from 'body-parser';
const express = require('express')
const bodyParser = require('body-parser')
// const uuidv4 = require('uuid')
import { v4 } from 'uuid'
import { SubscribeWithSign } from './API';
import { verify } from 'jws'
import * as cc from './ccClientService/financeClient'

const app = express()
const port = 3001
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();

app.use(express.static('public'))
const demoQrUrl = "http://localhost:3001/qrCodePay.html?"

app.post('/pay', jsonParser, async (req, res) => { //todo 进行支付 
  const subscribeId = await cc.createSubscribe(req.body)
  res.send(subscribeId)
})

app.post('/preOrder', jsonParser, (req, res) => {
  const verifySignResult = verifySign(req.body)
  if (!verifySignResult) {
    res.status(401).send("签名错误")//签名错误
    return;
  }
  const tradeNo = geneTradeNo()
  res.send({ "codeUrl": demoQrUrl, "tradeNo": tradeNo })
})




const geneTradeNo = () => { //获取预订单号
  return v4()
}

const getKey = (appId: string) => { //获取key
  console.log("DEMO中key为固定值")
  return "abcdef"
}


const verifySign = (body: SubscribeWithSign) => { //验证签名
  console.log(body.sign)
  console.log(body.appID)
  if (body.sign == null || body.appID == null) {
    return false
  }
  const key = getKey(body.appID);
  console.log(key)
  return verify(body.sign, 'HS256', key)
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


