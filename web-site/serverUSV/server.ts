const express = require('express')
var bodyParser = require('body-parser')
const axios = require('axios')
const EventEmitter = require('events').EventEmitter
const sign = require('jws').sign


// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import { EventEmitter } from 'events'
// import { sign } from 'jws'
// import axios from 'axios'

var http = require('http');
import { SubscribeWithSign } from './API';
const app = express()
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

app.post('/buy', jsonParser, async (req, res) => {
  const body: SubscribeWithSign = { ...req.body, ...{ "appID": appID } }

  const newBody = sortObjByKey(body)
  const signResult: string = signSubscribe(newBody)
  newBody["sign"] = signResult
  const result = await axios.post(preOrder, newBody, { headers: { 'Content-Type': 'application/json' } })
  res.send(JSON.stringify(result.data));

})


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

const getSubscribeIDByTradeNo = (tradeNo) => {
  //todo 
  return tradeNo
}

const getTradeNoBySubscribeID = (subscribeID) => {
  //todo
  return subscribeID
}



const serverInstance = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const io = require('socket.io')(serverInstance);

io.on('connection', function (socket) { // socket相关
  socket.on('connect', async function (tradeNo) {
    const subscribeID = getSubscribeIDByTradeNo(tradeNo)
    emitter.once(subscribeID + '_createSuccess', function () {
      if (io.sockets.connected[socket.id]) {
        io.sockets.connected[socket.id].emit('create', 'Success');
      }
    });
    cc.listenCreateResult(subscribeID, "Edu1MSP", emitter)
  })
});


