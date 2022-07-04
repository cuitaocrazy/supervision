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
import eduLessonService from './src/edu/LessonService'
app.get('/edu/lesson/findAll', async (req, res) => {
  console.log('教育机构: 查询所有课程')
  const r = await eduLessonService.findAll()
  res.send(r)
})
app.get('/edu/lesson/find', async (req, res) => {
  console.log(`教育机构: 搜索课程: 条件[${req.query}]`)
  const r = await eduLessonService.find(req.query)
  res.send(r)
})
import eduAttendanceService from './src/edu/AttendanceService';
app.post('/edu/attendance/apply', jsonParser, async (req, res) => {
  console.log(`教育机构: 发起签到`)
  const r = await eduAttendanceService.apply(req.body)
  res.send(r)
})
import eduTransferService from './src/edu/TransferService';
app.get('/edu/attendance/find', async (req, res) => {
  console.log(`教育机构: 查询划拨: 条件[${req.query}]`)
  const r = await eduTransferService.find(req.query)
  res.send(r)
})
import eduContractService from './src/edu/ContractService';
app.get('/edu/contract/find', async (req, res) => {
  console.log(`教育机构: 合约查询: 条件[${req.query}]`)
  const r = await eduContractService.find(req.query)
  res.send(r)
})



import { randomUUID } from 'crypto';
import * as moment from 'moment';
import {findOneLesson,findOneTeacher,findOneAttendance,saveTransfer,findOneEdu,searchLesson,saveContract,searchContract, findOneContract, saveAttendance} from './src/consumer/consumer'
import LessonService from './src/edu/LessonService';

const fenToYuan = (tranAmtYuan: string | number) => {
  if (typeof tranAmtYuan === 'number') {
    return tranAmtYuan / 100
  } else {
    return parseFloat(tranAmtYuan) / 100
  }
}


// import eduLogin from './src/edu/login'

//todo
const get3rdOrder = async ()=>{
  return {
    orderNo:'aaaaa'
  }
}
//todo
const getUserInfoByToken = async() =>{
  return {
    userId:'1',
    username:'testUserName'
  }
}

app.get('/consumer/lesson',jsonParser,async(req,res)=>{
  // const lessonListDemo = [
  //   { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程3-5岁", lessonTotalPrice: 88000, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001",lessonOutline:"01. 太阳（圆型 暖色调）1",teacher:{ teacherName: "李梅1", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101' },
  //   { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程5-7岁", lessonTotalPrice: 88000, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1",teacher:{ teacherName: "李梅2", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" } ,lessonStartDate:'20200101'},
  //   { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程7-9岁", lessonTotalPrice: 88000, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅3", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
  //   { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程9-11岁", lessonTotalPrice: 88000, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001",lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅4", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
  //   { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程11-13岁", lessonTotalPrice: 88000, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅5", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
  //   { lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程13-15岁", lessonTotalPrice: 88000, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1" ,teacher:{ teacherName: "李梅6", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" },lessonStartDate:'20200101'},
  // ]
  const lessonList = await searchLesson({page:1,size:10,searchValue:''})


  let convertLessonList : any[] = []
  convertLessonList = await Promise.all(lessonList.map(async (lesson:any)=>{
    lesson.lessonTotalPrice=fenToYuan(lesson.lessonTotalPrice)
    const edu = await findOneEdu({eduId:lesson.eduId})
    const teacher =  await findOneTeacher({teacherId:lesson.teacherId})
    lesson.edu=edu
    lesson.teacher=teacher
    lesson.lessonImgs =  "http://placekitten.com/g/200/300"
    return lesson
  }
  ))
  console.log('xxxx')
  console.log(convertLessonList)
  res.send({status:'success',result:convertLessonList})
})

app.post('/consumer/preOrder', jsonParser, async (req, res) => {

  //todo 
  const {userId,username} = await getUserInfoByToken();
  const {lessonId,studentName} = req.body
  const otherSystemInfo = await get3rdOrder();
  //todo 根据lessonID获取Lesson
  // const lesson : EduLesson=     { lessonType:'其他',lessonImgs: "http://placekitten.com/g/200/300", lessonName: "小熊美术课程5-7岁", lessonTotalPrice: 88000, lessonTotalQuantity: 58, lessonIntroduce: "艺术教育是未来教育", edu: { eduAddress: '地址：廊坊市安次区和平路荣益广场3层206',eduName:'教育机构1', eduContactPhone: "0316-78909090", eduId: "edu-001", eduLoginName: "kl", supervisorOrgId: "sup-org-001" }, lessonId: "lesson-001", eduId: "edu-001", teacherId: "teacher-001" ,lessonOutline:"01. 太阳（圆型 暖色调）1",teacher:{ teacherName: "李梅2", teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", teacherId: "teacher-001" } ,lessonStartDate:'20200101'} 
  try{
    const lesson = await findOneLesson({lessonId:lessonId})
    const edu = await findOneEdu({eduId:lesson.eduId})
    const teacher =  await findOneTeacher({teacherId:lesson.teacherId})
  //todo 合同状态
    const newContract  = {
    contractId:randomUUID().replaceAll('-',''),
    contractDate:moment().format('YYYYMMDD'),
    contractTime:moment().format('HHmmss'),
    contractStatus:'valid',
    eduId:lesson.eduId,
    eduName:edu.eduName,
    lessonId:lessonId,
    lessonName:lesson.lessonName,
    lessonType:lesson.lessonType,
    lessonIntroduce:lesson.lessonIntroduce,
    lessonOutline:lesson.lessonOutline,
    lessonStartDate:lesson.lessonStartDate,
    lessonStartTime:lesson.lessonStartTime,
    lessonEndDate:lesson.lessonEndDate,
    lessonEndTime:lesson.lessonEndTime,
    // lessonAttendanceType:lesson.lessonAttendanceType,
    lessonTotalQuantity:lesson.lessonTotalQuantity,
    lessonTotalPrice:fenToYuan(lesson.lessonTotalPrice),
    lessonPerPrice:lesson.lessonPerPrice,
    teacherId:lesson.teacherId,
    teacherName:teacher.teacherName,
    consumerId:userId,
    consumerName:username,
    consumerStuName:studentName,
    orderNo:otherSystemInfo.orderNo,
    lessonAccumulationQuantity:lesson.lessonAccumulationQuantity,
  }

  await saveContract(newContract)
  res.send({status:'success',result:newContract})
  }catch(e){
    res.send({status:'fail',result:'未知异常'})
  }
})

app.get('/consumer/contractList',jsonParser,async(req,res)=>{
  // let orderList = [
  //   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术1", teacherName: "张雷", lessonTotalPrice: 99900, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
  //   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术2", teacherName: "张雷", lessonTotalPrice: 99999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
  //   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术3", teacherName: "张雷", lessonTotalPrice: 99900, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
  //   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术4", teacherName: "张雷", lessonTotalPrice: 99999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
  //   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术5", teacherName: "张雷", lessonTotalPrice: 99999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
  //   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术6", teacherName: "张雷", lessonTotalPrice: 99999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
  //   { lessonImages: "http://placekitten.com/g/200/300", lessonName: "小熊美术7", teacherName: "张雷", lessonTotalPrice: 99999, lessonTotalQuantity: 58, eduAddress: "北京市海淀区大钟寺东路", eduContactPhone: "010-980990090", consumerStuName: "张大宝", lessonCompletedQuantity: 10, teacherIntroduce: "李雷，清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。清华大学美术学院，学士、硕士，7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖,7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖7年资深美育教研从业经验，20年媒体从业经历。7年资深美育教研工作中，李雷多次获得美术相关奖项：世界最高美术奖、中国美术金彩奖、徐悲鸿美术奖......", lessonIntroduce: "艺术教育是未来教育，是快乐教育" },
  // ]

  let orderList =  await searchContract({page:0,size:10,searchValue:{}})

  orderList.map(contract=>{
    contract.lessonTotalPrice=fenToYuan(contract.lessonTotalPrice)
    return contract;
  }
  )
  res.send({status:'success',result:orderList})
})


app.post('/consumer/checkIn',jsonParser,async(req,res)=>{
  try{
  const contractId = req.body.contractId;
  const contract = await findOneContract({contractId:contractId})
  // const lesson = await findOneLesson({lessonId:contract.l})
  // const edu = await findOneEdu({eduId:lesson.eduId})
  // const teacher =  await findOneTeacher({teacherId:lesson.teacherId})

  // const attendance = findOneAttendance({lessonId:contract.lessonId,consumerId:contract.consumerId,lessonQuantity:contract.lessonAccumulationQuantity+1,})
  
  const attendance = {
    attendanceId:randomUUID().replaceAll('-',''),
    attendanceDate:moment().format('YYYYMMDD'),
    attendanceTime:moment().format('HHmmss'),
    attendanceType:'manual',
    attendancelessonQuantity:1,
    eduId:contract.eduId,
    eduName:contract.eduName,
    lessonId:contract.lessonId,
    lessonName:contract.lessonName,
    consumerName:contract.consumerName,
    consumerId:contract.consumerId,
    consumerStuName:contract.consumerStuName,
    attendanceStatus:'manual'
  } 

  await saveAttendance(attendance);
  contract.lessonAccumulationQuantity=contract.lessonAccumulationQuantity+1;
  await saveContract(contract)
  const edu = await findOneEdu({eduId:contract.eduId})
  const transfer = {
    transferId:randomUUID().replaceAll('-',''),
    attendanceId:attendance.attendanceId,
    attendanceDate:attendance.attendanceDate,
    attendanceTime:attendance.attendanceTime,
    eduId:contract.eduId,
    eduName:contract.eduName,
    lessonId:contract.lessonId,
    lessonName:contract.lessonName,
    consumerName:contract.consumerName,
    consumerId:contract.consumerId,
    consumerStuName:contract.consumerStuName,
    supversingAccount:edu.eduSupervisedAccount,
    normalAccount:edu.eduNormalAccount,
    transferAmt:contract.lessonPerPrice*attendance.attendancelessonQuantity,
    transferResult:'todo',//todo
    reason:'签到后划拨'
  }
  await saveTransfer(transfer)
}catch (e){
  res.send({status:'fail',msg:'未知异常'})
}
  res.send({status:'success'})
})
app.post('/consumer/leave',jsonParser,async(req,res)=>{
  try{
  const contractId = req.body.contractId;
  const contract = await findOneContract({contractId:contractId})
  const attendance = {
    attendanceId:randomUUID().replaceAll('-',''),
    attendanceDate:moment().format('YYYYMMDD'),
    attendanceTime:moment().format('HHmmss'),
    attendanceType:'manual',
    attendancelessonQuantity:1,
    eduId:contract.eduId,
    eduName:contract.eduName,
    lessonId:contract.lessonId,
    lessonName:contract.lessonName,
    consumerName:contract.consumerName,
    consumerId:contract.consumerId,
    consumerStuName:contract.consumerStuName,
    attendanceStatus:'leave'
  } 
  const result = await saveAttendance(attendance);
  contract.lessonAccumulationQuantity=contract.lessonAccumulationQuantity+1;
  await saveContract(contract)
}catch (e){
  res.send({status:'fail',msg:'未知异常'})
}
  res.send({status:'success'})
})