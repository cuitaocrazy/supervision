const express = require('express')
const cryptoModel = require("crypto");
const bodyParser = require('body-parser')
const random = require('string-random')
const { v4: uuidv4 } = require('uuid');
import { SubscribeWithSign } from './API';

const app = express()
const port = 3001
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();

app.use(express.static('public'))
const demoQrUrl = "http://localhost:3001/qrCodePay.html?"
const nonseMap = {}

app.post('/pay', (req, res) => { //todo 进行支付 
  console.log('pay')
  console.log('do something on cc')
})


app.post('/nonse', jsonParser, (req, res) => {
  const nonse = random(8)
  setNonse(req.body.appId, nonse)
  res.send(nonse)
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
  return uuidv4()
}

const setNonse = (appId: string, nonse: string) => { //设定nonse
  console.log("DEMO中nonse保存在服务器")
  nonseMap[appId] = nonse
}

const getNonse = (appId: string) => { //获取nonse
  console.log("DEMO中nonse保存在服务器")
  const nonse = nonseMap[appId]
  nonseMap[appId] = null
  return nonse
}

const getKey = (appId: string) => { //获取key
  console.log("DEMO中key为固定值")
  return "abcdef"
}


const verifySign = (body: SubscribeWithSign) => { //验证签名
  if (body.sign == null || body.appID == null || body.nonse == null) {
    return false
  }
  let paramKv = ""
  const appId = body.appID
  Object.keys(body).forEach(function (key) {
    if (body[key] != null && key !== "sign" && key != "nonse") {
      paramKv = paramKv + key + "=" + body[key] + "&"
    } else if (key === "nonse") {
      const nonse = getNonse(appId)
      paramKv = paramKv + "nonse=" + nonse + "&"
    }
  })
  if (paramKv.lastIndexOf("&") + 1 === paramKv.length) {
    paramKv = paramKv.substring(0, paramKv.length - 1)
  }
  const key = getKey(body.appID);
  const hmac = cryptoModel.createHmac('sha256', key)
  hmac.update(paramKv)
  const sign = hmac.digest('hex')
  return sign.toLowerCase() === body.sign.toLowerCase()
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


