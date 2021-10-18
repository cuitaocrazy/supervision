const express = require('express')
const cryptoModel = require("crypto")
var bodyParser = require('body-parser')
const axios = require('axios')
const events = require('events');

import { SubscribeWithSign } from './API';


const app = express()
const io = require('socket.io')(app);
const port = 3002
var textParser = bodyParser.text()
var jsonParser = bodyParser.json()

const nonseUrl = "http://localhost:3001/nonse"
const preOrder = "http://localhost:3001/preOrder"
const payUrl = "http://localhost:3001/payUrl"
const auth = "localhost:3001"
const appId = "12345"
const key = "abcdef"
const socketMap = {};

var emitter = new events.EventEmitter();

io.on('connection', function (socket) { // socket相关
  socket.on('connect', async function (tradeNo) {
    const subscribeID = getSubscribeIDByTradeNo(tradeNo)
    emitter.once(subscribeID + '_createSuccess', function () {
      if (io.sockets.connected[socket.id]) {
        io.sockets.connected[socket.id].emit('create', 'Success');
      }
    });

  })
});

app.get('/test', (req, res) => {
  res.send('test connect')
})

app.post('/buy', jsonParser, async (req, res) => {
  const { data } = await axios.post(nonseUrl, { "appId": appId }, { headers: { 'Content-Type': 'application/json' } })
  const body: SubscribeWithSign = { ...req.body, ...{ "appId": appId, "nonse": data } }
  const newBody = sortObjByKey(body)
  const signResult: string = sign(newBody)
  newBody["sign"] = signResult
  const result = await axios.post(preOrder, newBody, { headers: { 'Content-Type': 'application/json' } })
  // result.data  {"codeUrl":demoQrUrl,"tradeNo":tradeNo}
  res.send(JSON.stringify(result.data));
  // res.redirect(301,result.data.codeUrl+"tradeNo="+result.data.tradeNo)
})


const sign = (body: SubscribeWithSign) => { //只能对平坦的jsonObject进行签名
  var paramKv = ""
  var newbody = sortObjByKey(body)
  var keys = Object.keys(newbody).sort()
  for (var i = 0; i < keys.length; i++) {
    paramKv = paramKv + keys[i] + "=" + body[keys[i]] + "&"
  }
  if (paramKv.lastIndexOf("&") + 1 === paramKv.length) {
    paramKv = paramKv.substring(0, paramKv.length - 1)
  }
  const hmac = cryptoModel.createHmac('sha256', key)
  hmac.update(paramKv)
  return hmac.digest('hex').toLocaleLowerCase()
}

const sortObjByKey = (obj: SubscribeWithSign) => {
  var keys = Object.keys(obj).sort()
  var newObj = {} as SubscribeWithSign
  for (var i = 0; i < keys.length; i++) {
    var index = keys[i]
    newObj[index] = obj[index]
  }
  return newObj
}

const getSubscribeIDByTradeNo = (tradeNo) => {
  //todo 返回真正的SubscribeID
  return "SubscribeID"
}

const waitCreateSuccess = async (tradeNo) => {
  //todo 返回真正的SubscribeID

}



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
