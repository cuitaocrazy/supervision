// import * as express from 'express';
// import * as bodyParser from 'body-parser';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cc from './ccClientService/SVClient'

const app = express()
const port = 3003
var textParser = bodyParser.text();
var jsonParser = bodyParser.json();

app.use(express.static('public'))

app.put('/cancel', jsonParser, async (req, res) => { //todo 进行支付 
  console.log('clean')
  console.log('do something on cc')
  console.log(req.body.SubscribeID)
  const result = await cc.cleanSubscribe("EdbMSP", req.body.SubscribeID)
  if (result === "FAIL") {
    res.send(500)
  } else {
    res.send({ "result": result })
  }
})

app.put('/complete', jsonParser, async (req, res) => { //todo 进行支付 
  console.log('complete')
  const subscribeId = await cc.completeSubscribe("EdbMSP", req.body.SubscribeID)
  if (subscribeId === "FAIL") {
    res.send(500)
  } else {
    res.send({ "result": subscribeId })
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
