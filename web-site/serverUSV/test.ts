const EventEmitter = require('events').EventEmitter

const testEventListener = async () => {
  const subscribeID = "Edu1MSP-BankMSP-EdbMSP-orderid0024"
  emitter.on(subscribeID + '_createSuccess', function () {
    console.log('get CC Event')
  });
  await cc.listenCreateResult("Edu1MSP-BankMSP-EdbMSP-orderid0024", "Edu1MSP", emitter)

}
testEventListener()