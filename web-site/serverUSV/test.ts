const EventEmitter = require('events').EventEmitter
import * as cc from './ccClientService/USVClient'
const axios = require('axios')

var emitter = new EventEmitter();
const testEventListener = async () => {
  const subscribeID = "Edu1MSP-BankMSP-EdbMSP-orderid0034"
  emitter.on(subscribeID + '_createSuccess', function () {
    console.log('get CC Event')
  });
  await cc.listenPayResult("Edu1MSP-BankMSP-EdbMSP-orderid0034", "Edu1MSP", emitter)
}

const testPreOrder = ()=>{
    const orderInfo = {
      "USVOrgID":"Edu1",
      "USVItemID": "12345",
      "USVItemName":"USVItemName",
      "USVItemDesc":"USVItemDesc",
      "PayerRemark":"PayerRemark",
      "TranAmt":1123
  }
  axios.post('http://localhost:3004/preOrder', orderInfo, { headers: { 'Content-Type': 'application/json' } }).then(res=>{
    console.log(res)
  })

}


const testPay = ()=>{
  const orderInfo = {"SubscribeDurationDays":365,"TranAmt":100,"USVOrgID":"Edu1MSP","USVItemID":"1","USVItemName":"系统架构师2021年下半年班","USVItemDesc":"系统架构师2021年下半年及2022年上半年有效的培训课程","USVOrderNo":"orderid0034","BankID":"BankMSP","BankTranID":"0000001","BankTranDate":"20210929","BankTranTime":"100130","PayerRemark":"用于准备xx考试","PayerStub":"付款凭证","SVOrgID":"EdbMSP","SubscribeStartDate":"20211030"}
  axios.post('http://localhost:3001/pay', orderInfo, { headers: { 'Content-Type': 'application/json' } }).then(res=>{
    console.log(res)
  })
}



testEventListener()