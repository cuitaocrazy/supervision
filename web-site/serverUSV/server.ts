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

// io.on('connection', function (socket) { // socket相关
//   console.log('somebody connection')
//   socket.emit('open');

//   socket.on('pay', async function (subscribeID) {
//     cc.listenPayResult(subscribeID, "Edu1MSP", emitter)
//     emitter.once(subscribeID + '_paySuccess', function () {
//       console.log('do pay emit')
//       socket.emit(subscribeID + '_pay', 'Success')
//     });

//   })
// });


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

import eduTeacherService from './src/edu/TeacherService'
app.get('/edu/teacher/find', async (req, res) => {
  console.log(`教育机构: 查询教师: 条件[${JSON.stringify(req.query)}]`)
  const r = await eduTeacherService.find(req.query)
  res.send(r)
})

app.post('/edu/teacher/create',jsonParser, async (req, res) => {
  console.log(`教育机构: 新增教师: 条件[${JSON.stringify(req.body)}]`)
  console.log(req.body)
  const teacher:EduTeacher = req.body
  teacher.teacherId = randomUUID().replaceAll('-','')
  teacher.teacherRating = 5
  teacher.teacherCreateDate = moment().format('YYYYMMDD')
  teacher.teacherCreateTime = moment().format('HHmmss')
  teacher.teacherUpdateDate = moment().format('YYYYMMDD')
  teacher.teacherUpdateTime = moment().format('HHmmss')
  const r = await eduTeacherService.saveEduTeacher(teacher)
  res.send(r)
})

app.post('/edu/teacher/modify',jsonParser,async (req, res) => {
  console.log(`教育机构: 修改教师教师: 条件[${JSON.stringify(req.body)}]`)
  console.log(req.body)
  try{
  let teacher:EduTeacher = await eduTeacherService.findOne(req.body.teacherId)
  teacher = {...teacher,...req.body}
  teacher.teacherUpdateDate = moment().format('YYYYMMDD')
  teacher.teacherUpdateTime = moment().format('HHmmss')
  const r = await eduTeacherService.saveEduTeacher(teacher)
  res.send(r)
  }catch(e){
    res.send({result:false})
  } 
})

app.post('/edu/teacher/del',jsonParser,async (req, res) => {
  console.log(`教育机构: 删除教师: 条件[${JSON.stringify(req.body)}]`)
  console.log(req.body)
  try{
  let teacher:EduTeacher = await eduTeacherService.findOne(req.body.teacherId)
  const r = await eduTeacherService.remove(teacher)
  res.send(r)
  }catch(e){
    console.log(e)
    res.send({result:false})
  } 
})


import eduLessonService from './src/edu/LessonService'

app.post('/edu/lesson/off',jsonParser, async (req, res) => {
  console.log(`教育局: 划拨查询: 条件[${JSON.stringify(req.body)}]`)
  const r = await eduLessonService.off(req.body)
  res.send(r)
})

app.get('/edu/lesson/findAll', async (req, res) => {
  console.log('教育机构: 查询所有课程')
  const r = await eduLessonService.findAll()
  await Promise.all(r.records.map(async (lesson:any)=>{
    const edu = await findOneEdu({ eduId: lesson.eduId })
    return lesson.edu = edu
  }))
  res.send(r)
})
app.get('/edu/lesson/find', async (req, res) => {
  console.log(`教育机构: 搜索课程: 条件[${JSON.stringify(req.query)}]`)
  const r = await eduLessonService.find(req.query)

  r.records.map((lesson:EduLesson)=>{lesson.lessonTotalPrice=fenToYuan(lesson.lessonTotalPrice);lesson.lessonPerPrice = fenToYuan(lesson.lessonPerPrice)})
  res.send(r)
})
app.post('/edu/lesson/create',jsonParser, async (req, res) => {
  console.log(`教育机构: 添加课程: 条件[${JSON.stringify(req.body)}]`)
  const lesson:EduLesson = req.body
  lesson.lessonId = randomUUID().replaceAll('-','')
  lesson.lessonName = req.body.lessonName
  lesson.lessonTotalQuantity = req.body.lessonTotalTimes
  lesson.lessonPerPrice = req.body.lessonPerPrice*100
  lesson.lessonTotalPrice = req.body.lessonTotalPrice*100
  lesson.lessonType = req.body.lessonType
  lesson.lessonIntroduce = req.body.lessonIntroduce
  lesson.lessonStartDate = req.body.lessonStartDate?.replaceAll('-','')
  lesson.lessonEndDate = req.body.lessonEndDate?.replaceAll('-','')
  lesson.lessonStatus = 'pending'
  lesson.lessonAccumulationQuantity = 0;
  //todo
  // lesson.teacherId = req.body.teacherId
  lesson.teacherId = 'teacher00001'
  lesson.teacherName = '马老师'
  lesson.eduId = 'edu0001'
  lesson.eduName = '测试机构'
  lesson.lessonImages = 'http://placekitten.com/g/200/300'
  lesson.lessonOutline = false
  lesson.lessonStartTime='000000'
  lesson.lessonEndTime='000000'
  lesson.lessonCreateDate = moment().format('YYYYMMDD')
  lesson.lessonCreateTime = moment().format('HHmmss')
  lesson.lessonUpdateDate = moment().format('YYYYMMDD')
  lesson.lessonUpdateTime = moment().format('HHmmss')
  lesson.lessonUpdateReason = '创建课程'
  try{
  console.log(lesson)
  const r = await eduLessonService.saveLesson(lesson)
  res.send({result:true,recode:r})
  }catch(e){
    console.log(e)
    res.send({result:false,})
  }

})

app.post('/edu/lesson/edit',jsonParser, async (req, res) => {
  console.log(`教育机构: 编辑课程: 条件[${JSON.stringify(req.body)}]`)
  const lesson:EduLesson = {} as EduLesson
  lesson.lessonId = req.body.lessonId
  lesson.lessonName = req.body.lessonName
  lesson.lessonTotalQuantity = req.body.lessonTotalTimes
  lesson.lessonPerPrice = req.body.lessonPerPrice*100
  lesson.lessonTotalPrice = req.body.lessonTotalPrice*100
  lesson.lessonType = req.body.lessonType
  lesson.lessonIntroduce = req.body.lessonIntroduce
  lesson.lessonStartDate = req.body.lessonStartDate?.replaceAll('-','')
  lesson.lessonEndDate = req.body.lessonEndDate?.replaceAll('-','')
  lesson.lessonStatus = 'pending'
  lesson.lessonAccumulationQuantity = 0;
  //todo
  // lesson.teacherId = req.body.teacherId
  lesson.teacherId = 'teacher00001'
  lesson.teacherName = '马老师'
  lesson.eduId = 'edu0001'
  lesson.eduName = '测试机构'
  lesson.lessonImages = 'http://placekitten.com/g/200/300'
  lesson.lessonOutline = false
  lesson.lessonStartTime='000000'
  lesson.lessonEndTime='000000'
  lesson.lessonCreateDate = moment().format('YYYYMMDD')
  lesson.lessonCreateTime = moment().format('HHmmss')
  lesson.lessonUpdateDate = moment().format('YYYYMMDD')
  lesson.lessonUpdateTime = moment().format('HHmmss')
  lesson.lessonUpdateReason = '编辑课程'
  try{
  console.log(lesson)
  const r = await eduLessonService.saveLesson(lesson)
  res.send({result:true,recode:r})
  }catch(e){
    console.log(e)
    res.send({result:false,})
  }

})





import eduAttendanceService from './src/edu/AttendanceService';
app.post('/edu/attendance/apply', jsonParser, async (req, res) => {
  console.log(`教育机构: 发起签到：内容[${req.body}]`)
  const r = await eduAttendanceService.apply(req.body)
  res.send(r)
})
app.get('/edu/attendance/find', async (req, res) => {
  console.log(`教育机构: 发起查询：内容[${req.query}]`)
  const r = await eduAttendanceService.find(req.query)
  res.send(r)
})

import eduTransferService from './src/edu/TransferService';
app.get('/edu/transfer/find', async (req, res) => {
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
import { findOneLesson, findOneTeacher, findAttendance, saveTransfer, findOneEdu, searchLesson, saveContract, searchContract, findOneContract, saveAttendance } from './src/consumer/consumer'
import { Attendance } from './src/entity/Attendance';
// import {pay,orderQuery} from './src/pay/pay'

const fenToYuan = (tranAmtYuan: string | number) => {
  if (typeof tranAmtYuan === 'number') {
    return tranAmtYuan / 100
  } else {
    return parseFloat(tranAmtYuan) / 100
  }
}


// import eduLogin from './src/edu/login'

//todo
const get3rdOrder = async () => {
  return {
    orderNo: 'aaaaa'
  }
}
//todo
const getUserInfoByToken = async () => {
  return {
    userId: '1',
    username: 'testUserName'
  }
}

app.get('/consumer/lesson', jsonParser, async (req, res) => {

  console.log(req.query)
  const lessonList = await searchLesson(req.query)


  let convertLessonList: any[] = []
  convertLessonList = await Promise.all(lessonList.map(async (lesson: any) => {
    lesson.lessonTotalPrice = fenToYuan(lesson.lessonTotalPrice)
    const edu = await findOneEdu({ eduId: lesson.eduId })
    const teacher = await findOneTeacher({ teacherId: lesson.teacherId })
    lesson.edu = edu
    lesson.teacher = teacher
    lesson.lessonImgs = "http://placekitten.com/g/200/300"
    return lesson
  }
  ))
  console.log('xxxx')
  console.log(convertLessonList)
  res.send({ status: 'success', result: convertLessonList })
})


io.on('connection', function (socket) { // socket相关
  console.log('some consumer connection')
  socket.emit('open');

  socket.on('pay', async function (contractId) {
    emitter.once(contractId + '_paySuccess', function () {
      console.log('do pay emit')
      socket.emit(contractId + '_pay', 'Success')
    });
  })
});


app.post('/consumer/preOrder', jsonParser, async (req, res) => {

  //todo 
  const { userId, username } = await getUserInfoByToken();
  const { lessonId, studentName } = req.body
  const otherSystemInfo = await get3rdOrder();
  try {
  
    const lesson = await findOneLesson({ lessonId: lessonId })
    const edu = await findOneEdu({ eduId: lesson.eduId })
    const teacher = await findOneTeacher({ teacherId: lesson.teacherId })
    //todo 合同状态
    const newContract = {
      contractId: randomUUID().replaceAll('-', ''),
      contractDate: moment().format('YYYYMMDD'),
      contractTime: moment().format('HHmmss'),
      contractStatus: 'valid',
      eduId: lesson.eduId,
      eduName: edu.eduName,
      lessonId: lessonId,
      lessonName: lesson.lessonName,
      lessonType: lesson.lessonType,
      lessonIntroduce: lesson.lessonIntroduce,
      lessonOutline: lesson.lessonOutline,
      lessonStartDate: lesson.lessonStartDate,
      lessonStartTime: lesson.lessonStartTime,
      lessonEndDate: lesson.lessonEndDate,
      lessonEndTime: lesson.lessonEndTime,
      // lessonAttendanceType:lesson.lessonAttendanceType,
      lessonTotalQuantity: lesson.lessonTotalQuantity,
      lessonTotalPrice: fenToYuan(lesson.lessonTotalPrice),
      lessonPerPrice: lesson.lessonPerPrice,
      teacherId: lesson.teacherId,
      teacherName: teacher.teacherName,
      consumerId: userId,
      consumerName: username,
      consumerStuName: studentName,
      orderNo: otherSystemInfo.orderNo,
      lessonAccumulationQuantity: lesson.lessonAccumulationQuantity,
    }

    await saveContract(newContract)
    res.send({ status: 'success', result: newContract })
    //todo 数币完成后走下面
    // const payUrl = pay(newContract.contractId,newContract.contractDate.concat(newContract.contractTime),String(newContract.lessonTotalPrice),'merchantNo',newContract.lessonName)
    // res.send({ status: 'success', result: newContract,payUrl:payUrl })
  } catch (e) {
    res.send({ status: 'fail', result: '未知异常' })
  }
})

app.get('/consumer/contractList', jsonParser, async (req, res) => {


  let orderList = await searchContract(req.query)

  orderList.map(contract => {
    contract.lessonTotalPrice = fenToYuan(contract.lessonTotalPrice)
    return contract;
  }
  )
  res.send({ status: 'success', result: orderList })
})


app.post('/consumer/checkIn', jsonParser, async (req, res) => {
  try {
    const contractId = req.body.contractId;
    const contract = await findOneContract({ contractId: contractId })
    // const lesson = await findOneLesson({lessonId:contract.l})
    // const edu = await findOneEdu({eduId:lesson.eduId})
    // const teacher =  await findOneTeacher({teacherId:lesson.teacherId})

    // const attendance : Attendance = await findOneAttendance({lessonId:contract.lessonId,consumerId:contract.consumerId,lessonQuantity:contract.lessonAccumulationQuantity+1,})

    const attendance = {
      attendanceId: randomUUID().replaceAll('-', ''),
      attendanceDate: moment().format('YYYYMMDD'),
      attendanceTime: moment().format('HHmmss'),
      attendanceType: 'manual',
      attendanceLessonQuantity: 1,
      eduId: contract.eduId,
      eduName: contract.eduName,
      lessonId: contract.lessonId,
      lessonName: contract.lessonName,
      consumerName: contract.consumerName,
      consumerId: contract.consumerId,
      consumerStuName: contract.consumerStuName,
      attendanceStatus: 'manual'
    }

    attendance.attendanceStatus = 'manual'

    await saveAttendance(attendance);
    contract.lessonAccumulationQuantity = contract.lessonAccumulationQuantity + 1;
    await saveContract(contract)
    const edu = await findOneEdu({ eduId: contract.eduId })
    const transfer = {
      transferId: randomUUID().replaceAll('-', ''),
      attendanceId: attendance.attendanceId,
      attendanceDate: attendance.attendanceDate,
      attendanceTime: attendance.attendanceTime,
      eduId: contract.eduId,
      eduName: contract.eduName,
      lessonId: contract.lessonId,
      lessonName: contract.lessonName,
      consumerName: contract.consumerName,
      consumerId: contract.consumerId,
      consumerStuName: contract.consumerStuName,
      supversingAccount: edu.eduSupervisedAccount,
      normalAccount: edu.eduNormalAccount,
      transferAmt: contract.lessonPerPrice * attendance.attendanceLessonQuantity,
      transferResult: 'todo',//todo
      reason: '签到后划拨'
    }
    await saveTransfer(transfer)
  } catch (e) {
    res.send({ status: 'fail', msg: '未知异常' })
  }
  res.send({ status: 'success' })
})
app.post('/consumer/leave', jsonParser, async (req, res) => {
  try {
    const contractId = req.body.contractId;
    const contract = await findOneContract({ contractId: contractId })
    const attendance = {
      attendanceId: randomUUID().replaceAll('-', ''),
      attendanceDate: moment().format('YYYYMMDD'),
      attendanceTime: moment().format('HHmmss'),
      attendanceType: 'manual',
      attendancelessonQuantity: 1,
      eduId: contract.eduId,
      eduName: contract.eduName,
      lessonId: contract.lessonId,
      lessonName: contract.lessonName,
      consumerName: contract.consumerName,
      consumerId: contract.consumerId,
      consumerStuName: contract.consumerStuName,
      attendanceStatus: 'leave'
    }
    const result = await saveAttendance(attendance);
    contract.lessonAccumulationQuantity = contract.lessonAccumulationQuantity + 1;
    await saveContract(contract)
  } catch (e) {
    res.send({ status: 'fail', msg: '未知异常' })
  }
  res.send({ status: 'success' })
})

app.get('/consumer/attendance', jsonParser, async (req, res) => {
  try {
    // const {consumerId,lessonId} = req.params
    const attendanceList = await findAttendance(req.params as { consumerId: string, lessonId: string })
    res.send({ status: 'success', result: attendanceList })
  } catch (e) {
    res.send({ status: 'fail', msg: '未知异常' })
  }
})

app.post('/consumer/login', jsonParser, async (req, res) => {
  res.send({ status: 'success', result: { username: '用户1', loginName: '登录名1' } })
})

app.post('/consumer/notice',jsonParser,async (req, res) => {
  const {merchantNo,orderNo,orderSeq,cardType,payTime,orderStatus,payAmount,orderIp,orderRefer,returnActFlag,signData} = req.query
  //orderNo即contractId
  const contract = await findOneContract({contractId:orderNo})
//   0：未处理
// 1：支付
// 2：撤销（未启用）
// 3：退货
// 4：未明
// 5：失败
// 6：下单
  if(orderStatus=='1'){
    contract.contractStatus = 'valid'
    contract.contractUpdateDate = moment().format('YYYYMMDD')
    contract.contractUpdateTime = moment().format('HHmmss')
    contract.contractUpdateReason = '付费完成'
    emitter.emit(orderNo + '_paySuccess',contract)
  }

})


import edbEduOrgService from './src/edb/EduOrgService';
import edbTeacherService from './src/edb/TeacherService';
import edbChainCodeService from './src/edb/ChainCodeService';
import { EduOrg } from './src/entity/EduOrg';
import { ChainCode } from './src/entity/ChainCode';

app.get('/edb/chainCode/find', async (req, res) => {
  console.log(`教育局: 查询链码: `)
  const r = await edbChainCodeService.find()
  res.send(r)
})

app.get('/edb/teacher/find', async (req, res) => {
  console.log(`教育局: 查询教师: 条件[${JSON.stringify(req.query)}]`)
  const r = await edbTeacherService.find(req.query)
  res.send(r)
})






app.get('/edb/eduOrg/find', async (req, res) => {
  console.log(`教育局: 查询教育机构: 条件[${req.query}]`)
  const r = await edbEduOrgService.find({ ...new EduOrg(), ...req.query })
  res.send(r)
})
import edbEduLessonService from './src/edb/EduLessonService'
app.get('/edb/eduLesson/find', async (req, res) => {
  console.log(`教育局: 查询课程: 条件[${req.query}]`)
  const r = await edbEduLessonService.find(req.query)
  res.send(r)
})

app.get('/edb/contract/find', async (req, res) => {
  console.log(`教育局: 合同查询: 条件[${{ ...req.query }}]`)
  const r = await eduContractService.find(req.query)
  res.send(r)
})
import edbAttendanceService from './src/edb/AttendanceService'
import edbTransferService from './src/edb/TransferService'
import edbContractService from './src/edb/ContractService'
import { Transfer } from './src/entity/Transfer';
import { EduLesson } from './src/entity/EduLesson';
import { EduTeacher } from './src/entity/EduTeacher';
import edbSupervisorUserService from './src/edb/SupervisorService'
app.get('/edb/chaincode/count', async (req, res) => {
  console.log(`教育局: 查询考勤:`)
  const attendanceCount = await edbAttendanceService.count()
  const transferCount = await edbTransferService.count()
  const contractCount = await edbContractService.count()
  res.send({result:true,records:{attendanceTotal:attendanceCount,transferCount:transferCount,contractCount:contractCount}})
})

app.get('/edb/attendance/find', async (req, res) => {
  console.log(`教育局: 考勤查询: 条件[${JSON.stringify(req.query)}]`)
  const r = await edbAttendanceService.find(req.query)
  res.send(r)
})
app.get('/edb/transfer/find', async (req, res) => {
  console.log(`教育局: 划拨查询: 条件[${JSON.stringify(req.query)}]`)
  const r = await eduTransferService.find({ ...new Transfer(), ...req.query })
  res.send(r)
})


app.get('/edb/supervisorUser/find', async (req, res) => {
  console.log(`教育局: 教育局用户查询: 条件[${JSON.stringify(req.query)}]`)
  const r = await edbSupervisorUserService.find(req.query)

  await Promise.all(r.records.map(async (user:any)=>{
    const org = await edbSupervisorUserService.findOneOrg({ supervisorOrgId: user.supervisorOrgId })
    return user.supervisorOrgName = org.supervisorOrgName
  }))

  res.send(r)
})

app.post('/edb/login', async (req, res) => {
  res.send({ status: 'success', result: { userId:'0',username: '用户1', loginName: '登录名1' } })
})


app.post('/edb/lesson/audit',jsonParser, async (req, res) => {
  console.log(`教育局: 划拨查询: 条件[${JSON.stringify(req.body)}]`)
  const r = await edbEduLessonService.update(req.body)
  res.send(r)
})

