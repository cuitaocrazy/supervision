const express = require('express')
const crypto = require("crypto");
const bodyParser = require('body-parser')
const random = require('string-random')
const { v4: uuidv4 } = require('uuid');

const app = express()
const port = 3001
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();

app.use(express.static('public'))
const demoQrUrl = "http://localhost:3001/qrCodePay.html?"
const nonseMap = {}

app.post('/pay', (req, res) => { //todo 进行支付 
    console.log(pay)
})


app.post('/nonse',jsonParser, (req, res) => {
  const nonse = random(8)
  setNonse(req.body.appId,nonse)
  res.send(nonse)
})



app.post('/preOrder',jsonParser, (req, res) => {
    const verifySignResult = verifySign(req.body)
    if(!verifySignResult){
      res.status(401).send("签名错误")//签名错误
      return;
    }
    const tradeNo = geneTradeNo()
    res.send({"codeUrl":demoQrUrl,"tradeNo":tradeNo})
})

const geneTradeNo = ()=>{ //获取预订单号
  return uuidv4()
}

const setNonse = (appId,nonse) =>{ //设定nonse
  console.log("DEMO中nonse保存在服务器")
  nonseMap[appId] = nonse
}

const getNonse = (appId) =>{ //获取nonse
  console.log("DEMO中nonse保存在服务器")
  const nonse = nonseMap[appId]
  nonseMap[appId] = null
  return nonse
}

const getKey = (appId)=>{ //获取key
  console.log("DEMO中key为固定值")
  return "abcdef"
}


const verifySign = (body) =>{ //验证签名
  console.log(body)
  if(body.sign==null||body.appId==null||body.nonse==null){
    return false
  }
  let paramKv = ""
  const appId = body.appId
  Object.keys(body).forEach(function (key) {
    if(body[key]!=null&&key!=="sign"&&key!="nonse"){
      paramKv = paramKv+key+"="+body[key]+"&"
    }else if(key==="nonse"){
      const nonse = getNonse(appId)
      paramKv = paramKv + "nonse=" + nonse +"&"
    }
  })
  if(paramKv.lastIndexOf("&")+1===paramKv.length){
    paramKv =paramKv.substring(0,paramKv.length-1)
  }
  const key = getKey(body.appId); 
  const hmac = crypto.createHmac('sha256', key)
  hmac.update(paramKv)
  const sign = hmac.digest('hex')
  return sign.toLowerCase()===body.sign.toLowerCase()
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})