const express = require('express')
var bodyParser = require('body-parser')
const axios = require('axios')
const EventEmitter = require('events').EventEmitter
const sign = require('jws').sign
var cors = require("cors");
import { v4 } from 'uuid'


// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import { EventEmitter } from 'events'
// import { sign } from 'jws'
// import axios from 'axios'

var http = require('http');
import { SubscribeWithSign } from './API';
const app = express()
app.use(cors());
app.use(express.static('out'));
var server = http.createServer(app);
import * as cc from './ccClientService/USVClient'

const port = 3004
var textParser = bodyParser.text()
var jsonParser = bodyParser.json()

const preOrder = "http://localhost:3001/preOrder"
const payUrl = "http://localhost:3001/payUrl"
const auth = "localhost:3001"
const appID = "12345"
const key = "abcdef"
const socketMap = {};

var emitter = new EventEmitter();


app.get('/test', (req, res) => {
  res.send('test connect')
})

app.post('/preorder', jsonParser, async (req, res) => {
  const body: SubscribeWithSign = { ...req.body, ...{ "appID": appID, "BankID": "BankMSP", "SVOrgID": "EdbMSP", "USVOrgID": "Edu1MSP" } }
  const bodyWithStartDateAndDurDays = getStartDateAndDurDaysByItemId(body)
  const newBody = sortObjByKey(bodyWithStartDateAndDurDays)
  const signResult: string = signSubscribe(newBody)
  newBody["sign"] = signResult
  const result = await axios.post(preOrder, newBody, { headers: { 'Content-Type': 'application/json' } })
  //{ "codeUrl": demoQrUrl, "BankTranId": tradeNo, PayerStub: PayerStub, "BankTranDate": moment(Date.now()).format('YYYYMMDD'), "BankTranTime": moment(Date.now()).format('HHmmss') }
  result.data = { ...result.data, ...{ "USVOrderNo": geneUSVOrderNo(), "BankID": "BankMSP", "SVOrgID": "EdbMSP" } }
  res.send(result.data);
})

const getStartDateAndDurDaysByItemId = (body: SubscribeWithSign) => {
  return {
    ...body, ...{ "SubscribeStartDate": "20211030", "SubscribeDurationDays": 365 }
  }
}

const geneUSVOrderNo = () => { //获取预订单号
  // return "testUSVOrderNo"
  return v4().replace('-', '').replace('-', '').replace('-', '').replace('-', '')
}



const signSubscribe = (body: SubscribeWithSign) => {
  const signResult = sign(
    {
      'header': { 'alg': 'HS256' },
      'payload': body,
      'secret': key,
    }
  )
  return signResult
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

export const getSubscribeIDByUSVOrderNo = (USVOrderNo) => {
  //todo 

  // Edu1MSP-BankMSP-EdbMSP-orderid0035
  return "Edu1MSP-BankMSP-EdbMSP-" + USVOrderNo
}

const getTradeNoBySubscribeID = (subscribeID) => {
  //todo
  return subscribeID
}

app.put('/cancel', jsonParser, async (req, res) => { //todo 进行支付 
  const result = await cc.cleanSubscribe("EdbMSP", req.body.SubscribeID)
  if (result === "FAIL") {
    res.send(500)
  } else {
    res.send({ "result": result })
  }
})



const serverInstance = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const io = require('socket.io')(serverInstance);

io.on('connection', function (socket) { // socket相关
  console.log('somebody connection')
  socket.emit('open');
  socket.on('pay', async function (USVOrderNo) {

    const subscribeID = getSubscribeIDByUSVOrderNo(USVOrderNo)
    console.log('subscribeID----' + subscribeID)
    emitter.once(subscribeID + '_createSuccess', function () {
      console.log('emitter on  ' + subscribeID + '_createSuccess')
      socket.emit(USVOrderNo + '_create', 'Success')
      // if (io.sockets.connected[socket.id]) {
      //   io.sockets.connected[socket.id].emit(USVOrderNo + '_create', 'Success');
      // }
    });
    cc.listenCreateResult(subscribeID, "Edu1MSP", emitter)
  })
});


