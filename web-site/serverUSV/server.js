const express = require('express')
const crypto = require("crypto")
var bodyParser = require('body-parser')
const axios = require('axios')


const app = express()
const port = 3002
var textParser = bodyParser.text()
var jsonParser = bodyParser.json()

const nonseUrl = "http://localhost:3001/nonse"
const preOrder = "http://localhost:3001/preOrder"
const auth = "localhost:3001"
const appId = "12345"
const key = "abcdef"



app.get('/test', (req, res) => {
  res.send('test connect')
})

app.post('/buy',jsonParser,async (req,res) => {
    const {data} = await axios.post(nonseUrl, {"appId":appId},{headers: {'Content-Type': 'application/json'}})
    const body = {...req.body,...{"appId":appId,"nonse":data}}
    const newBody = sortObjByKey(body)
    const signResult = sign(newBody)
    newBody["sign"] = signResult
    const result = await axios.post(preOrder,newBody,{headers: {'Content-Type': 'application/json'}})
    res.redirect(301,result.data.codeUrl+"tradeNo="+result.data.tradeNo)
})


const sign = (body)=>{ //只能对平坦的jsonObject进行签名
  var paramKv = ""
  var newbody = sortObjByKey(body)
  var keys = Object.keys(newbody).sort()
  for(var i = 0 ;i < keys.length ;i++){
    paramKv = paramKv + keys[i] +"="+body[keys[i]]+"&"
  }
  if(paramKv.lastIndexOf("&")+1===paramKv.length){
    paramKv =paramKv.substring(0,paramKv.length-1)
  }
  const hmac = crypto.createHmac('sha256', key)
  hmac.update(paramKv)
  return hmac.digest('hex').toLocaleLowerCase()
}

const sortObjByKey =(obj)=>{
  var keys = Object.keys(obj).sort()
  var newObj = {}
  for(var i = 0 ;i < keys.length ;i++){
    var index = keys[i]
    newObj[index] = obj[index]
  }
  return newObj
}




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
