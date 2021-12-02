import * as express from 'express';
import * as bodyParser from 'express';
import * as moment from 'moment';
import { v4 } from 'uuid'
import { SubscribeWithSign, Subscribe } from './API';
import { verify } from 'jws'
import * as cc from './ccClientService/financeClient'

const app = express()
const port = 3001
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();

app.use(express.static('out'))
const demoQrUrl = "http://localhost:3001/pay"

let demoOrderInfo = {};//demo中模拟数据库中的保存信息

app.post('/pay', jsonParser, async (req, res) => { //todo 进行支付 
  const BankTranID: string = req.body.BankTranID
  const orderInfo = demoOrderInfo[BankTranID]
  const subscribeId = await cc.createSubscribe(orderInfo)
  if (subscribeId === "FAIL") {
    res.send({ "result": "FAIL" })
  } else {
    res.send({ "result": subscribeId })
  }
})


app.post('/paytest', jsonParser, async (req, res) => { //todo 进行支付 
  const subscribeId = await cc.createSubscribe(req.body)

  if (subscribeId === "FAIL") {
    res.send({ "result": "FAIL" })
  } else {
    res.send({ "result": subscribeId })
  }
})

app.get('/pay', jsonParser, async (req, res) => { //二维码扫码后返回信息
  const { BankTranID, USVOrderNo, BankID, SVOrgID } = req.query
  const orderInfo = demoOrderInfo[BankTranID as string]
  orderInfo.USVOrderNo = USVOrderNo
  orderInfo.BankID = BankID
  orderInfo.SVOrgID = SVOrgID
  res.redirect(301, '/pay.html?BankTranID=' + BankTranID);
})



app.post('/preOrder', jsonParser, (req, res) => {
  const verifySignResult = verifySign(req.body)
  if (!verifySignResult) {
    res.status(401).send("签名错误")//签名错误
    return;
  }
  const tradeNo = geneTradeNo()
  const PayerStub = genePayerStub()
  mockSaveLocalDB({ ...req.body, ...{ "BankTranID": tradeNo, PayerStub: PayerStub, "BankTranDate": moment(Date.now()).format('YYYYMMDD'), "BankTranTime": moment(Date.now()).format('HHmmss') } })
  res.send({ "codeUrl": demoQrUrl, "BankTranID": tradeNo })
})




const mockSaveLocalDB = (orderInfo: Subscribe) => {
  orderInfo.TranAmt = yuanToFen(orderInfo.TranAmt)
  demoOrderInfo[orderInfo.BankTranID] = orderInfo
}




const geneTradeNo = () => { //获取预订单号
  let tradeNo: string = v4()
  return tradeNo.replace('-', '').replace('-', '').replace('-', '').replace('-', '')
}

const genePayerStub = () => { //获取存根
  return v4()
}



const getKey = (appId: string) => { //获取key
  return "abcdef"
}

const yuanToFen = (tranAmtYuan: string | number) => {
  if (typeof tranAmtYuan === 'number') {
    return tranAmtYuan * 100
  } else {
    return parseFloat(tranAmtYuan) * 100
  }
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


