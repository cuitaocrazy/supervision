import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import { SubscribeWithSign } from './API';
import { sign } from 'jws'
import * as axios from 'axios'
import * as cors from 'cors'
import { EventEmitter } from 'events'

import { v4 } from 'uuid'

const app = express()
app.use(cors());
app.use(express.static('out'));
var server = http.createServer(app);
import * as cc from './ccClientService/USVClient'

const port = 3004
var jsonParser = bodyParser.json()

const preOrder = "http://localhost:3001/preOrder"
const appID = "12345"
const key = "abcdef"

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
  const result = await axios.default.post(preOrder, newBody, { headers: { 'Content-Type': 'application/json' } })
  //{ "codeUrl": demoQrUrl, "BankTranId": tradeNo, PayerStub: PayerStub, "BankTranDate": moment(Date.now()).format('YYYYMMDD'), "BankTranTime": moment(Date.now()).format('HHmmss') }
  result.data = { ...result.data, ...{ "USVOrderNo": geneUSVOrderNo(), "BankID": "BankMSP", "SVOrgID": "EdbMSP" } }
  res.send(result.data);
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
    emitter.once(subscribeID + '_createSuccess', function () {
      socket.emit(USVOrderNo + '_create', 'Success')
    });
    cc.listenCreateResult(subscribeID, "Edu1MSP", emitter)
  })
});


