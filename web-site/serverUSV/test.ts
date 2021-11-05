const EventEmitter = require('events').EventEmitter
import * as cc from './ccClientService/USVClient'

var emitter = new EventEmitter();
const testEventListener = async () => {
  const subscribeID = "Edu1MSP-BankMSP-EdbMSP-orderid0034"
  emitter.on(subscribeID + '_createSuccess', function () {
    console.log('get CC Event')
  });
  await cc.listenCreateResult("Edu1MSP-BankMSP-EdbMSP-orderid0034", "Edu1MSP", emitter)

}
testEventListener()