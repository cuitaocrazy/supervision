import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import { SubscribeWithSign } from './API';
import { sign } from 'jws'
import * as cors from 'cors'
import { EventEmitter } from 'events'

import { v4 } from 'uuid'

const app = express()
app.use(cors());
app.use(express.static('out'));
import * as cc from './ccClientService/USVClient'

const port = 3003
const jsonParser = bodyParser.json()

const appID = "12345"
const key = "abcdef"

var emitter = new EventEmitter();


app.get('/test', (req, res) => {
  res.send('test connect')
})

app.post('/preorder', jsonParser, async (req, res) => {
  const body: SubscribeWithSign = { ...req.body, ...{ "appID": appID, "BankID": "BankMSP", "SVOrgID": "EdbMSP", "USVOrgID": "Edu1MSP" } }
  const newBody: SubscribeWithSign = getStartDateAndDurDaysByItemId(body)
  newBody.USVOrderNo = geneUSVOrderNo()
  newBody.BankID = "BankMSP"
  newBody.SVOrgID = "EdbMSP"
  newBody.TranAmt = yuanToFen(newBody.TranAmt)
  const subscribeID = getSubscribeIDByUSVOrderNo(newBody.USVOrderNo)
  cc.listenPreOrderResult(subscribeID, "Edu1MSP", emitter)
  await cc.preOrder(newBody)
  emitter.once(subscribeID + '_preorder', function (subscribe: SubscribeWithSign) {
    res.send({ "SubscribeID": subscribeID, PayUrl: subscribe.PayUrl });
    // socket.emit(USVOrderNo + '_create', 'Success')
  });
  // res.send(result.data);
})

//todo this is a demo
const getStartDateAndDurDaysByItemId = (body: SubscribeWithSign) => {
  return {
    ...body, ...{ "SubscribeStartDate": "20211030", "SubscribeDurationDays": 365 }
  }
}

const geneUSVOrderNo = () => { //获取预订单号
  return v4().replaceAll('-', '')
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
  return "Edu1MSP-BankMSP-EdbMSP-" + USVOrderNo
}

app.put('/cancel', jsonParser, async (req, res) => {
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

  socket.on('pay', async function (subscribeID) {
    cc.listenPayResult(subscribeID, "Edu1MSP", emitter)
    emitter.once(subscribeID + '_paySuccess', function () {
      console.log('do pay emit')
      socket.emit(subscribeID + '_pay', 'Success')
    });

  })
});


const yuanToFen = (tranAmtYuan: string | number) => {
  if (typeof tranAmtYuan === 'number') {
    return tranAmtYuan * 100
  } else {
    return parseFloat(tranAmtYuan) * 100
  }
}

import eduLogin from './src/edu/login'
app.post('/edu/login', jsonParser, async (req, res) => {
  const r = await eduLogin(req.body)
  res.send(r)
})
import lessonService from './src/edu/LessonService'
app.get('/edu/lesson/findAll', async (req, res) => {
  console.log('教育机构: 查询所有课程')
  const r = await lessonService.findAll()
  res.send(r)
})
app.get('/edu/lesson/find', async (req, res) => {
  console.log(`教育机构: 搜索课程: 条件[${req.query}]`)
  const r = await lessonService.find(req.query)
  res.send(r)
})