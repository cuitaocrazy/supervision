import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import { SubscribeWithSign } from "./API";
import { sign } from "jws";
import * as cors from "cors";
import { EventEmitter } from "events";
import { v4 } from "uuid";
import fetch from "node-fetch";
const { exec } = require("child_process");
// import forge from "node-forge";
// crypto.constants;
const forge = require("node-forge");

// const fetch = require("node-fetch");
console.log("sssssssssss");
console.log(typeof fetch);
const NodeRSA = require("node-rsa");
const app = express();
app.use(cors());
app.use(express.static("out"));
import * as cc from "./ccClientService/USVClient";

const port = 3003;
const jsonParser = bodyParser.json();
//查询后台是否交易成功的最大次数。
const QUERYPAYMENTMAX = 60;
const decryptServiceUrl = "http://localhost:2999/encrypt?plainText=";
const appID = "12345";

var emitter = new EventEmitter();

app.get("/test", (req, res) => {
  res.send("test connect");
});

app.post("/preorder", jsonParser, async (req, res) => {
  const body: SubscribeWithSign = {
    ...req.body,
    ...{
      appID: appID,
      BankID: "BankMSP",
      SVOrgID: "EdbMSP",
      USVOrgID: "Edu1MSP",
    },
  };
  const newBody: SubscribeWithSign = getStartDateAndDurDaysByItemId(body);
  newBody.USVOrderNo = geneUSVOrderNo();
  newBody.BankID = "BankMSP";
  newBody.SVOrgID = "EdbMSP";
  newBody.TranAmt = yuanToFen(newBody.TranAmt);
  const subscribeID = getSubscribeIDByUSVOrderNo(newBody.USVOrderNo);
  cc.listenPreOrderResult(subscribeID, "Edu1MSP", emitter);
  await cc.preOrder(newBody);
  emitter.once(
    subscribeID + "_preorder",
    function (subscribe: SubscribeWithSign) {
      res.send({ SubscribeID: subscribeID, PayUrl: subscribe.PayUrl });

      // socket.emit(USVOrderNo + '_create', 'Success')
    }
  );
  // res.send(result.data);
});

//todo this is a demo
const getStartDateAndDurDaysByItemId = (body: SubscribeWithSign) => {
  return {
    ...body,
    ...{ SubscribeStartDate: "20211030", SubscribeDurationDays: 365 },
  };
};

const geneUSVOrderNo = () => {
  //获取预订单号
  return v4().replaceAll("-", "");
};

// const signSubscribe = (body: SubscribeWithSign) => {
//   const signResult = sign({
//     header: { alg: "HS256" },
//     payload: body,
//     secret: key,
//   });
//   return signResult;
// };

const sortObjByKey = (obj: SubscribeWithSign) => {
  var keys = Object.keys(obj).sort();
  var newObj = {} as SubscribeWithSign;
  for (var i = 0; i < keys.length; i++) {
    var index = keys[i];
    newObj[index] = obj[index];
  }
  return newObj;
};

export const getSubscribeIDByUSVOrderNo = (USVOrderNo) => {
  return "Edu1MSP-BankMSP-EdbMSP-" + USVOrderNo;
};

app.put("/cancel", jsonParser, async (req, res) => {
  const result = await cc.cleanSubscribe("EdbMSP", req.body.SubscribeID);
  if (result === "FAIL") {
    res.send(500);
  } else {
    res.send({ result: result });
  }
});

const serverInstance = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const io = require("socket.io")(serverInstance, { cors: true });

const yuanToFen = (tranAmtYuan: string | number) => {
  if (typeof tranAmtYuan === "number") {
    return tranAmtYuan * 100;
  } else {
    return parseFloat(tranAmtYuan) * 100;
  }
};

import eduLogin from "./src/edu/login";

app.post("/edu/login", jsonParser, async (req, res) => {
  const r = await eduLogin(req.body);
  res.send(r);
});

import eduTeacherService from "./src/edu/TeacherService";
import eduTransactionService from "./src/edu/TransactionService";
import eduEduService from "./src/edu/EduService";
app.get("/edu/teacher/find", async (req, res) => {
  console.log(`教育机构: 查询教师: 条件[${JSON.stringify(req.query)}]`);
  const r = await eduTeacherService.find(req.query);
  res.send(r);
});

app.get("/edu/transaction/find", async (req, res) => {
  console.log(`教育机构: 查询流水信息: 条件[${JSON.stringify(req.query)}]`);
  const loginName = req.query.loginName;
  const edu = await EduService.findByLoginName(loginName);

  const r = await eduTransactionService.query(
    req.query,
    edu.eduSupervisedAccount
  );
  r.records.map((record: any) => {
    record.transactionAmt = fenToYuan(record.transactionAmt);
  });
  res.send(r);
});

app.get("/edu/transaction/sum", async (req, res) => {
  console.log(`教育机构: 查询汇总信息: 条件[${JSON.stringify(req.query)}]`);
  const loginName = req.query.loginName;
  const edu = await EduService.findByLoginName(loginName);
  const contractSum = await eduContractService.sum(edu.eduId);
  const r = await eduTransactionService.sum(edu.eduSupervisedAccount);
  const result = { ...contractSum, ...r };
  res.send(result);
});

app.post("/edu/teacher/create", jsonParser, async (req, res) => {
  console.log(`教育机构: 新增教师: 条件[${JSON.stringify(req.body)}]`);
  console.log(req.body);
  const teacher: EduTeacher = req.body;
  teacher.teacherId = randomUUID().replaceAll("-", "");
  teacher.teacherRating = 5;
  teacher.teacherCreateDate = moment().format("YYYYMMDD");
  teacher.teacherCreateTime = moment().format("HHmmss");
  teacher.teacherUpdateDate = moment().format("YYYYMMDD");
  teacher.teacherUpdateTime = moment().format("HHmmss");
  const r = await eduTeacherService.saveEduTeacher(teacher);
  res.send(r);
});

app.post("/edu/teacher/modify", jsonParser, async (req, res) => {
  console.log(`教育机构: 修改教师教师: 条件[${JSON.stringify(req.body)}]`);
  console.log(req.body);
  try {
    let teacher: EduTeacher = await eduTeacherService.findOne(
      req.body.teacherId
    );
    teacher = { ...teacher, ...req.body };
    teacher.teacherUpdateDate = moment().format("YYYYMMDD");
    teacher.teacherUpdateTime = moment().format("HHmmss");
    const r = await eduTeacherService.saveEduTeacher(teacher);
    res.send(r);
  } catch (e) {
    res.send({ result: false });
  }
});

app.post("/edu/teacher/del", jsonParser, async (req, res) => {
  console.log(`教育机构: 删除教师: 条件[${JSON.stringify(req.body)}]`);
  console.log(req.body);
  try {
    let teacher: EduTeacher = await eduTeacherService.findOne(
      req.body.teacherId
    );
    const r = await eduTeacherService.remove(teacher);
    res.send(r);
  } catch (e) {
    console.log(e);
    res.send({ result: false });
  }
});

import eduLessonService from "./src/edu/LessonService";

app.post("/edu/lesson/off", jsonParser, async (req, res) => {
  console.log(`教育局: 划拨查询: 条件[${JSON.stringify(req.body)}]`);
  const r = await eduLessonService.off(req.body);
  res.send(r);
});

app.get("/edu/lesson/findAll", async (req, res) => {
  console.log("教育机构: 查询所有课程");
  const r = await eduLessonService.findAll();
  await Promise.all(
    r.records.map(async (lesson: any) => {
      const edu = await findOneEdu({ eduId: lesson.eduId });
      return (lesson.edu = edu);
    })
  );
  res.send(r);
});
app.get("/edu/lesson/find", async (req, res) => {
  console.log(`教育机构: 搜索课程: 条件[${JSON.stringify(req.query)}]`);
  const r = await eduLessonService.find(req.query);

  r.records.map((lesson: EduLesson) => {
    lesson.lessonTotalPrice = fenToYuan(lesson.lessonTotalPrice);
    lesson.lessonPerPrice = fenToYuan(lesson.lessonPerPrice);
  });
  res.send(r);
});
app.post("/edu/lesson/create", jsonParser, async (req, res) => {
  console.log(`教育机构: 添加课程: 条件[${JSON.stringify(req.body)}]`);
  const lesson: EduLesson = req.body;
  lesson.lessonId = randomUUID().replaceAll("-", "");
  lesson.lessonName = req.body.lessonName;
  lesson.lessonTotalQuantity = req.body.lessonTotalTimes;
  lesson.lessonPerPrice = req.body.lessonPerPrice * 100;
  lesson.lessonTotalPrice = req.body.lessonTotalPrice * 100;
  lesson.lessonType = req.body.lessonType;
  lesson.lessonIntroduce = req.body.lessonIntroduce;
  lesson.lessonStartDate = req.body.lessonStartDate?.replaceAll("-", "");
  lesson.lessonEndDate = req.body.lessonEndDate?.replaceAll("-", "");
  lesson.lessonStatus = "pending";
  lesson.lessonAccumulationQuantity = 0;
  //todo
  // lesson.teacherId = req.body.teacherId
  lesson.teacherId = "teacher00001";
  lesson.teacherName = "马老师";
  lesson.eduId = "edu0001";
  lesson.eduName = "测试机构";
  lesson.lessonImages =
    "https://s3.bmp.ovh/imgs/2022/08/22/6413446f9e3649da.jpg"; //'http://placekitten.com/g/200/300'
  lesson.lessonOutline = false;
  lesson.lessonStartTime = "000000";
  lesson.lessonEndTime = "000000";
  lesson.lessonCreateDate = moment().format("YYYYMMDD");
  lesson.lessonCreateTime = moment().format("HHmmss");
  lesson.lessonUpdateDate = moment().format("YYYYMMDD");
  lesson.lessonUpdateTime = moment().format("HHmmss");
  lesson.lessonUpdateReason = "创建课程";
  try {
    console.log(lesson);
    const r = await eduLessonService.saveLesson(lesson);
    res.send({ result: true, recode: r });
  } catch (e) {
    console.log(e);
    res.send({ result: false });
  }
});

app.post("/edu/lesson/edit", jsonParser, async (req, res) => {
  console.log(`教育机构: 编辑课程: 条件[${JSON.stringify(req.body)}]`);
  const lesson: EduLesson = {} as EduLesson;
  lesson.lessonId = req.body.lessonId;
  lesson.lessonName = req.body.lessonName;
  lesson.lessonTotalQuantity = req.body.lessonTotalTimes;
  lesson.lessonPerPrice = req.body.lessonPerPrice * 100;
  lesson.lessonTotalPrice = req.body.lessonTotalPrice * 100;
  lesson.lessonType = req.body.lessonType;
  lesson.lessonIntroduce = req.body.lessonIntroduce;
  lesson.lessonStartDate = req.body.lessonStartDate?.replaceAll("-", "");
  lesson.lessonEndDate = req.body.lessonEndDate?.replaceAll("-", "");
  lesson.lessonStatus = "pending";
  lesson.lessonAccumulationQuantity = 0;
  //todo
  // lesson.teacherId = req.body.teacherId
  lesson.teacherId = "teacher00001";
  lesson.teacherName = "马老师";
  lesson.eduId = "edu0001";
  lesson.eduName = "测试机构";
  lesson.lessonImages =
    "https://s3.bmp.ovh/imgs/2022/08/22/6413446f9e3649da.jpg"; //'http://placekitten.com/g/200/300'
  lesson.lessonOutline = false;
  lesson.lessonStartTime = "000000";
  lesson.lessonEndTime = "000000";
  lesson.lessonCreateDate = moment().format("YYYYMMDD");
  lesson.lessonCreateTime = moment().format("HHmmss");
  lesson.lessonUpdateDate = moment().format("YYYYMMDD");
  lesson.lessonUpdateTime = moment().format("HHmmss");
  lesson.lessonUpdateReason = "编辑课程";
  try {
    console.log(lesson);
    const r = await eduLessonService.saveLesson(lesson);
    res.send({ result: true, recode: r });
  } catch (e) {
    console.log(e);
    res.send({ result: false });
  }
});

import eduAttendanceService from "./src/edu/AttendanceService";
app.post("/edu/attendance/apply", jsonParser, async (req, res) => {
  console.log(`教育机构: 发起签到：内容[${req.body}]`);
  const r = await eduAttendanceService.apply(req.body);
  res.send(r);
});
app.get("/edu/attendance/find", async (req, res) => {
  console.log(`教育机构: 发起查询：内容[${req.query}]`);
  const r = await eduAttendanceService.find(req.query);
  res.send(r);
});

import eduTransferService from "./src/edu/TransferService";
app.get("/edu/transfer/find", async (req, res) => {
  console.log(`教育机构: 查询划拨: 条件[${req.query}]`);
  const r = await eduTransferService.find(req.query);
  res.send(r);
});
import eduContractService from "./src/edu/ContractService";
app.get("/edu/contract/find", async (req, res) => {
  console.log(`教育机构: 合约查询: 条件[${req.query}]`);
  const r = await eduContractService.find(req.query);
  r.records.map((contract) => {
    contract.lessonTotalPrice = fenToYuan(contract.lessonTotalPrice);
    contract.lessonPerPrice = fenToYuan(contract.lessonPerPrice);
    return contract;
  });
  res.send(r);
});

import { randomUUID } from "crypto";
import * as moment from "moment";
import {
  findOneLesson,
  findOneTeacher,
  findAttendance,
  saveTransfer,
  findOneEdu,
  searchLesson,
  saveContract,
  searchContract,
  findOneContract,
  saveAttendance,
  saveTransaction,
  getNextSeq,
} from "./src/consumer/consumer";
import { Attendance } from "./src/entity/Attendance";
// import {pay,orderQuery} from './src/pay/pay'

const fenToYuan = (tranAmtYuan: string | number) => {
  if (typeof tranAmtYuan === "number") {
    return tranAmtYuan / 100;
  } else {
    return parseFloat(tranAmtYuan) / 100;
  }
};

// import eduLogin from './src/edu/login'

//todo
const get3rdOrder = async () => {
  return {
    orderNo: randomUUID().replaceAll("-", ""),
  };
};

const getContractId = (teminalNo, seq) => {
  return teminalNo + moment().format("YYYYMMDDHHmmss") + seq;
};

const getTransactionId = () => {
  return randomUUID().replaceAll("-", "").substring(8, 16);
};
//todo
const getUserInfoByToken = async () => {
  return { username: "用户1", loginName: "登录名1", userId: 1 };
};

app.get("/consumer/lesson", jsonParser, async (req, res) => {
  console.log(req.query);
  const lessonList = await searchLesson(req.query);

  let convertLessonList: any[] = [];
  convertLessonList = await Promise.all(
    lessonList.map(async (lesson: any) => {
      lesson.lessonTotalPrice = fenToYuan(lesson.lessonTotalPrice);
      const edu = await findOneEdu({ eduId: lesson.eduId });
      const teacher = await findOneTeacher({ teacherId: lesson.teacherId });
      lesson.edu = edu;
      lesson.teacher = teacher;
      if (lesson.lessonImgs == null) {
        lesson.lessonImgs =
          "https://s3.bmp.ovh/imgs/2022/08/22/6413446f9e3649da.jpg"; //"http://placekitten.com/g/200/300"
      }
      return lesson;
    })
  );
  console.log("xxxx");
  console.log(convertLessonList);
  res.send({ status: "success", result: convertLessonList });
});

// io.on("connection", function (socket) {
//   // socket相关
//   console.log("some consumer connection");
//   socket.emit("open");

//   socket.on("pay", async function (contractId) {
//     emitter.once(contractId + "_paySuccess", function () {
//       console.log("do pay emit");
//       socket.emit(contractId + "_pay", "Success");
//     });
//   });
// });

app.post("/consumer/preOrder", jsonParser, async (req, res) => {
  //todo
  const { userId, username } = await getUserInfoByToken();
  const { lessonId, studentName } = req.body;
  const otherSystemInfo = await get3rdOrder();
  try {
    const lesson = await findOneLesson({ lessonId: lessonId });
    const edu = await findOneEdu({ eduId: lesson.eduId });
    const teacher = await findOneTeacher({ teacherId: lesson.teacherId });
    const seq = await getNextSeq();
    //todo 合同状态
    const newContract = {
      contractId: getContractId(testTermId, seq),
      contractDate: moment().format("YYYYMMDD"),
      contractTime: moment().format("HHmmss"),
      contractStatus: "valid",
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
      lessonTotalPrice: lesson.lessonTotalPrice,
      lessonAttendanceType: "manual",
      lessonPerPrice: lesson.lessonPerPrice,
      teacherId: lesson.teacherId,
      teacherName: teacher.teacherName,
      consumerId: userId,
      consumerName: username,
      consumerStuName: studentName,
      orderNo: otherSystemInfo.orderNo,
      lessonAccumulationQuantity: lesson.lessonAccumulationQuantity,
    };
    console.log(newContract);
    await saveContract(newContract);
    const newTransaction = {
      transactionId: getTransactionId(),
      contractId: newContract.contractId,
      transactionAmt: lesson.lessonTotalPrice,
      tranType: "buycard",
      tranDate: newContract.contractDate,
      tranTime: newContract.contractTime,
      eduSupervisedAccount: edu.eduSupervisedAccount,
    };

    saveTransaction(newTransaction);

    newContract.lessonTotalPrice = fenToYuan(newContract.lessonTotalPrice);
    newContract.lessonPerPrice = fenToYuan(newContract.lessonPerPrice);
    res.send({ status: "success", result: newContract });
    //todo 数币完成后走下面
    // const payUrl = pay(newContract.contractId,newContract.contractDate.concat(newContract.contractTime),String(newContract.lessonTotalPrice),'merchantNo',newContract.lessonName)
    // res.send({ status: 'success', result: newContract,payUrl:payUrl })
  } catch (e) {
    res.send({ status: "fail", result: "未知异常" });
  }
});

app.get("/consumer/contractList", jsonParser, async (req, res) => {
  let orderList = await searchContract(req.query);

  orderList.map((contract) => {
    contract.lessonTotalPrice = fenToYuan(contract.lessonTotalPrice);
    contract.lessonPerPrice = fenToYuan(contract.lessonPerPrice);
    return contract;
  });
  res.send({ status: "success", result: orderList });
});

app.post("/consumer/checkIn", jsonParser, async (req, res) => {
  try {
    const contractId = req.body.contractId;
    const contract = await findOneContract({ contractId: contractId });
    // const lesson = await findOneLesson({lessonId:contract.l})
    // const edu = await findOneEdu({eduId:lesson.eduId})
    // const teacher =  await findOneTeacher({teacherId:lesson.teacherId})

    // const attendance : Attendance = await findOneAttendance({lessonId:contract.lessonId,consumerId:contract.consumerId,lessonQuantity:contract.lessonAccumulationQuantity+1,})

    const attendance = {
      attendanceId: randomUUID().replaceAll("-", ""),
      attendanceDate: moment().format("YYYYMMDD"),
      attendanceTime: moment().format("HHmmss"),
      attendanceType: "manual",
      attendanceLessonQuantity: 1,
      eduId: contract.eduId,
      eduName: contract.eduName,
      lessonId: contract.lessonId,
      lessonName: contract.lessonName,
      consumerName: contract.consumerName,
      consumerId: contract.consumerId,
      consumerStuName: contract.consumerStuName,
      attendanceStatus: "valid",
    };

    attendance.attendanceStatus = "valid";

    await saveAttendance(attendance);
    contract.lessonAccumulationQuantity =
      contract.lessonAccumulationQuantity + 1;
    await saveContract(contract);
    const edu = await findOneEdu({ eduId: contract.eduId });
    const transfer = {
      transferId: getTransactionId(),
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
      transferAmt:
        contract.lessonPerPrice * attendance.attendanceLessonQuantity,
      transferResult: "success",
      reason: "签到后划拨",
    };
    await saveTransfer(transfer);
    const newTransaction = {
      transactionId: getTransactionId(),
      contractId: contract.contractId,
      transactionAmt: transfer.transferAmt,
      tranType: "transfer",
      tranDate: attendance.attendanceDate,
      tranTime: attendance.attendanceTime,
      eduSupervisedAccount: edu.eduSupervisedAccount,
    };

    await saveTransaction(newTransaction);
  } catch (e) {
    res.send({ status: "fail", msg: "未知异常" });
  }
  res.send({ status: "success" });
});
app.post("/consumer/leave", jsonParser, async (req, res) => {
  try {
    const contractId = req.body.contractId;
    const contract = await findOneContract({ contractId: contractId });
    const attendance = {
      attendanceId: randomUUID().replaceAll("-", ""),
      attendanceDate: moment().format("YYYYMMDD"),
      attendanceTime: moment().format("HHmmss"),
      attendanceType: "manual",
      attendancelessonQuantity: 1,
      eduId: contract.eduId,
      eduName: contract.eduName,
      lessonId: contract.lessonId,
      lessonName: contract.lessonName,
      consumerName: contract.consumerName,
      consumerId: contract.consumerId,
      consumerStuName: contract.consumerStuName,
      attendanceStatus: "invalid",
    };
    const result = await saveAttendance(attendance);
    contract.lessonAccumulationQuantity =
      contract.lessonAccumulationQuantity + 1;
    await saveContract(contract);
  } catch (e) {
    res.send({ status: "fail", msg: "未知异常" });
  }
  res.send({ status: "success" });
});

app.get("/consumer/attendance", jsonParser, async (req, res) => {
  try {
    // const {consumerId,lessonId} = req.params
    const attendanceList = await findAttendance(
      req.query as { consumerId: string; lessonId: string }
    );
    res.send({ status: "success", result: attendanceList });
  } catch (e) {
    res.send({ status: "fail", msg: "未知异常" });
  }
});

app.post("/consumer/login", jsonParser, async (req, res) => {
  res.send({
    status: "success",
    result: { username: "用户1", loginName: "登录名1", userId: 1 },
  });
});

app.post("/consumer/notice", jsonParser, async (req, res) => {
  const {
    merchantNo,
    orderNo,
    orderSeq,
    cardType,
    payTime,
    orderStatus,
    payAmount,
    orderIp,
    orderRefer,
    returnActFlag,
    signData,
  } = req.query;
  //orderNo即contractId
  const contract = await findOneContract({ contractId: orderNo });
  //   0：未处理
  // 1：支付
  // 2：撤销（未启用）
  // 3：退货
  // 4：未明
  // 5：失败
  // 6：下单
  if (orderStatus == "1") {
    contract.contractStatus = "valid";
    contract.contractUpdateDate = moment().format("YYYYMMDD");
    contract.contractUpdateTime = moment().format("HHmmss");
    contract.contractUpdateReason = "付费完成";
    emitter.emit(orderNo + "_paySuccess", contract);
  }
});

import edbEduOrgService from "./src/edb/EduOrgService";
import edbTeacherService from "./src/edb/TeacherService";
import edbChainCodeService from "./src/edb/ChainCodeService";
import edbTransactionService from "./src/edb/TransactionService";
import { EduOrg } from "./src/entity/EduOrg";
import { ChainCode } from "./src/entity/ChainCode";

app.get("/edb/chainCode/find", async (req, res) => {
  console.log(`教育局: 查询链码: `);
  const r = await edbChainCodeService.find();
  res.send(r);
});

app.get("/edb/refund/find", async (req, res) => {
  console.log(`教育局: 查询退款信息: 条件[${JSON.stringify(req.query)}]`);
  const r = await edbTransactionService.refundQuery(req.query);
  r.records.map((record: any) => {
    record.transactionAmt = fenToYuan(record.transactionAmt);
  });
  res.send(r);
});

app.get("/edb/transaction/find", async (req, res) => {
  console.log(`教育局: 查询流水信息: 条件[${JSON.stringify(req.query)}]`);
  const r = await edbTransactionService.query(req.query);
  r.records.map((record: any) => {
    record.transactionAmt = fenToYuan(record.transactionAmt);
  });
  res.send(r);
});

app.get("/edb/balance/find", async (req, res) => {
  console.log(`教育局: 查询余额信息: 条件[${JSON.stringify(req.query)}]`);
  const r = await edbTransactionService.balanceQuery(req.query);
  r.records.map((record: any) => {
    record.sum = fenToYuan(record.sum);
  });
  res.send(r);
});

app.get("/edb/teacher/find", async (req, res) => {
  console.log(`教育局: 查询教师: 条件[${JSON.stringify(req.query)}]`);
  const r = await edbTeacherService.find(req.query);
  res.send(r);
});

app.get("/edb/eduOrg/find", async (req, res) => {
  console.log(`教育局: 查询教育机构: 条件[${req.query}]`);
  const r = await edbEduOrgService.find({ ...new EduOrg(), ...req.query });
  res.send(r);
});
import edbEduLessonService from "./src/edb/EduLessonService";
app.get("/edb/eduLesson/find", async (req, res) => {
  console.log(`教育局: 查询课程: 条件[${req.query}]`);
  const r = await edbEduLessonService.find(req.query);
  res.send(r);
});

app.get("/edb/contract/find", async (req, res) => {
  console.log(`教育局: 合同查询: 条件[${{ ...req.query }}]`);
  const r = await eduContractService.find(req.query);
  r.records.map((contract) => {
    contract.lessonTotalPrice = fenToYuan(contract.lessonTotalPrice);
    contract.lessonPerPrice = fenToYuan(contract.lessonPerPrice);
    return contract;
  });
  res.send(r);
});

app.get("/edb/transaction/sum", async (req, res) => {
  console.log(`监管机构: 查询汇总信息: 条件[${JSON.stringify(req.query)}]`);
  const loginName = req.query.loginName;
  const edu = await EduService.findByLoginName(loginName);
  const contractSum = await edbContractService.sum();
  const r = await edbTransactionService.sum();
  const result = { ...contractSum, ...r };
  res.send(result);
});

import edbAttendanceService from "./src/edb/AttendanceService";
import edbTransferService from "./src/edb/TransferService";
import edbContractService from "./src/edb/ContractService";
import { Transfer } from "./src/entity/Transfer";
import { EduLesson } from "./src/entity/EduLesson";
import { EduTeacher } from "./src/entity/EduTeacher";
import edbSupervisorUserService from "./src/edb/SupervisorService";
import TransferService from "./src/edu/TransferService";
import EduService from "./src/edu/EduService";
import { Transaction } from "fabric-network";
import { stdout } from "process";
import { CustomRepositoryCannotInheritRepositoryError } from "typeorm";
app.get("/edb/chaincode/count", async (req, res) => {
  console.log(`教育局: 查询考勤:`);
  const attendanceCount = await edbAttendanceService.count();
  const transferCount = await edbTransferService.count();
  const contractCount = await edbContractService.count();
  res.send({
    result: true,
    records: {
      attendanceTotal: attendanceCount,
      transferCount: transferCount,
      contractCount: contractCount,
    },
  });
});

app.get("/edb/attendance/find", async (req, res) => {
  console.log(`教育局: 考勤查询: 条件[${JSON.stringify(req.query)}]`);
  const r = await edbAttendanceService.find(req.query);
  res.send(r);
});
app.get("/edb/transfer/find", async (req, res) => {
  console.log(`教育局: 划拨查询: 条件[${JSON.stringify(req.query)}]`);
  const r = await eduTransferService.find({ ...new Transfer(), ...req.query });
  r.records.map((transfer: Transfer) => {
    transfer.transferAmt = fenToYuan(transfer.transferAmt);
  });
  res.send(r);
});

app.get("/edb/supervisorUser/find", async (req, res) => {
  console.log(`教育局: 教育局用户查询: 条件[${JSON.stringify(req.query)}]`);
  const r = await edbSupervisorUserService.find(req.query);

  await Promise.all(
    r.records.map(async (user: any) => {
      const org = await edbSupervisorUserService.findOneOrg({
        supervisorOrgId: user.supervisorOrgId,
      });
      return (user.supervisorOrgName = org.supervisorOrgName);
    })
  );

  res.send(r);
});

app.post("/edb/login", async (req, res) => {
  res.send({
    status: "success",
    result: { userId: "0", username: "用户1", loginName: "登录名1" },
  });
});

app.post("/edb/lesson/audit", jsonParser, async (req, res) => {
  console.log(`教育局: 划拨查询: 条件[${JSON.stringify(req.body)}]`);
  const r = await edbEduLessonService.update(req.body);
  res.send(r);
});

//轮询队列

// const publicKey =
//   "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJzDYAOKvZU66RSCFwc6L+/hwY/kp1ZK5otH1rIKBk6BFZBrtpOvby45y86WEIc4Dpjf9SKWg//YhzbmWhY9LGHivC2/+Ysy/qn7ndP9j+vyEZ51KVbmFEvXhlKqhuEnX5HvdxgLyV0/ZRDFOXFzKY7vrSUv4QAC7o7MiH1W4B5wIDAQAB";
const remotePath = "http://47.94.12.189:80/zj/test/";

// var test = "1234567";
// const pbkey = new NodeRSA(
//   "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----"
// );
// console.log(pbkey);
// console.log("-------------------");
// const encrypted = pbkey.encrypt(test, "base64");
// console.log(encrypted);
// const decrypted = pbkey.decryptPublic(encrypted, "utf8");
// console.log(decrypted);
const remotePayPath =
  "http://47.94.12.189:80/zj/test/rsaPositiveTran/applyDzzfQrCode/";
const remoteQueryPath =
  "http://47.94.12.189:80/zj/test/rsaPositiveTran/paymentQuery/";
const testMerId = "000000000000000";
const testTermId = "00000000";

const updateContractAndSaveTransaction = async (contractId) => {
  const contract = await findOneContract({
    contractId: contractId,
  });
  contract.contractStatus = "valid";
  saveContract(contract);
  const edu = await findOneEdu({ eduId: contract.eduId });
  const newTransaction = {
    transactionId: getTransactionId(),
    contractId: contract.contractId,
    transactionAmt: contract.lessonTotalPrice,
    tranType: "buycard",
    tranDate: contract.contractDate,
    tranTime: contract.contractTime,
    eduSupervisedAccount: edu.eduSupervisedAccount,
  };
  await saveTransaction(newTransaction);
};

io.on("connection", function (socket) {
  // socket相关
  console.log("somebody connection");
  socket.emit("open");

  socket.on("pcPay", async function (contractId) {
    var count = 0;
    const intervalId = setInterval(() => {
      console.log("pcPay");
      console.log(contractId);
      if (count > QUERYPAYMENTMAX) {
        console.log("clear Interval");
        clearInterval(intervalId);
        return;
      }
      count++;
      // socket.emit(contractId+'_pay')
      const queryInfo = {
        merId: testMerId,
        termId: testTermId,
        tranDate: moment().format("YYYYMMDD"),
        tranTime: moment().format("HHmmss"),
        merOrderNo: getContractId(testTermId, "000000"),
        oldMerOrderNo: contractId,
      };
      const plainText = encrypt(JSON.stringify(queryInfo), newPublicKey);
      fetch(remoteQueryPath + testMerId, {
        method: "POST",
        body: plainText,
        headers: {
          MerchantId: testMerId,
        },
      }).then((serverRes) => {
        serverRes.text().then((text) => {
          if (text.indexOf("原交易不存在") > -1) {
            return;
          }
          try {
            console.log("-------------");
            fetch(decryptServiceUrl + text).then((dncryptRes) => {
              dncryptRes.text().then((dncryptText) => {
                console.log(dncryptText);
                const json = JSON.parse(dncryptText);
                console.log(json);
                if (json.respCode == "000000" && json.oldRespCode == "000000") {
                  updateContractAndSaveTransaction(contractId).then(() => {
                    socket.emit(contractId + "_pay");
                    clearInterval(intervalId);
                    return;
                  });
                }
              });
            });
            // const cdCmd = `cd ${__dirname}/../ `;
            // const javaCmd = `java RSAEncryptByPubk ` + text;
            // const cmd = cdCmd + " && " + javaCmd;

            // exec(cmd, (error, stdout, stderr) => {
            //   //todo window会有乱码，解决方法见http://t.zoukankan.com/daysme-p-15795143.html，其他系统应无乱码，因此暂不解决
            //   const json = JSON.parse(stdout);
            //   //todo 失败暂不考虑
            //   console.log("json");
            //   if (json.respCode == "000000" && json.oldRespCode == "000000") {
            //     updateContractAndSaveTransaction(contractId).then(() => {
            //       socket.emit(contractId + "_pay");
            //       clearInterval(intervalId);
            //       return;
            //     });
            //   }
            // });
          } catch (e) {
            console.log(e);
            clearInterval(intervalId);
          }
        });
      });
    }, 10000);
  });
});

const newPublicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0FT/LTwXOx1GIwDcOjn8C7pL2Gjv5xhr7PXdEyzyoakiGNc4ed1njQiw/crOziAQpFLZEZfZ9yPi/9/EFQtnexPzqWynYr0Vga0caNVVHqxA7Eivyphv6Tq8H69ecd7umI+8CM9qvsxC/+4Podf3Xnvi5N0ux992ZJKv18RDB0wIDAQAB";
const qianzhui = "-----BEGIN PUBLIC KEY-----\n";
const houzhui = "\n-----END PUBLIC KEY-----";

app.post("/consumer/pc/preOrder", jsonParser, async (req, res) => {
  //todo
  const { userId, username } = await getUserInfoByToken();
  const { lessonId, studentName } = req.body;

  try {
    const lesson = await findOneLesson({ lessonId: lessonId });
    const edu = await findOneEdu({ eduId: lesson.eduId });
    const teacher = await findOneTeacher({ teacherId: lesson.teacherId });
    const seq = await getNextSeq();
    //todo 合同状态
    //todo 测试方便终端号写死为00000000
    const newContract = {
      contractId: getContractId(testTermId, seq),
      contractDate: moment().format("YYYYMMDD"),
      contractTime: moment().format("HHmmss"),
      contractStatus: "wait",
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
      lessonTotalPrice: lesson.lessonTotalPrice,
      lessonAttendanceType: "manual",
      lessonPerPrice: lesson.lessonPerPrice,
      teacherId: lesson.teacherId,
      teacherName: teacher.teacherName,
      consumerId: userId,
      consumerName: username,
      consumerStuName: studentName,
      orderNo: "",
      lessonAccumulationQuantity: lesson.lessonAccumulationQuantity,
    };
    await saveContract(newContract);
    newContract.lessonTotalPrice = fenToYuan(newContract.lessonTotalPrice);

    // const bankJson = {
    //   merId: testMerId,
    //   termId: testTermId,
    //   tranDate: moment().format("YYYYMMDD"),
    //   tranTime: moment().format("HHmmss"),
    //   merOrderNo: "00000000" + moment().format("YYYYMMDDHHmmss") + "000001",
    //   tranAmt: 1,
    //   ccyCode: 156,
    //   orderDesc: "test",
    // };

    //todo 由于测试交易会产生真实扣款，所以金额设定为1分
    //todo 中文会有问题
    const bankJson = {
      merId: "000000000000000",
      termId: "00000000",
      tranDate: newContract.contractDate,
      tranTime: newContract.contractTime,
      merOrderNo: newContract.contractId,
      tranAmt: 1,
      ccyCode: 156,
      orderDesc: "lessonName",
    };

    console.log(bankJson);
    const plainText = encrypt(JSON.stringify(bankJson), newPublicKey);
    fetch(remotePayPath + testMerId, {
      method: "POST",
      body: plainText,
      headers: {
        MerchantId: testMerId,
      },
    }).then((serverRes) => {
      serverRes.text().then((text) => {
        console.log(text);
        console.log("-------------");
        if (text.indexOf("原交易不存在") > -1) {
          return;
        }
        fetch(decryptServiceUrl + text).then((dncryptRes) => {
          dncryptRes.text().then((dncryptText) => {
            console.log(dncryptText);
            const json = JSON.parse(dncryptText);
            console.log(json);
            if (json.qrCode) {
              res.send({
                status: "success",
                result: newContract,
                payUrl: json.qrCode,
              });
            }
          });
        });
      });
    });

    //todo 数币完成后走下面
    // const payUrl = pay(newContract.contractId,newContract.contractDate.concat(newContract.contractTime),String(newContract.lessonTotalPrice),'merchantNo',newContract.lessonName)
    // res.send({ status: 'success', result: newContract,payUrl:payUrl })
  } catch (e) {
    res.send({ status: "fail", result: "未知异常" });
  }
});

const encrypt = (plainText: string, publicKeyStr: string) => {
  const publicK = forge.pki.publicKeyFromPem(qianzhui + publicKeyStr + houzhui);

  const data = Buffer.from(plainText, "utf8");
  const inputLen = data.length;
  let offSet = 0;
  let cache;
  let resultArray = [];

  let i = 0;
  while (inputLen - offSet > 0) {
    if (inputLen - offSet > 117) {
      let tempBuffer = Buffer.alloc(117);
      data.copy(tempBuffer, 0, offSet, offSet + 117);
      const cacheStr = publicK.encrypt(tempBuffer, "RSAES-PKCS1-V1_5");
      cache = Buffer.from(cacheStr, "binary");
    } else {
      let tempBuffer = Buffer.alloc(inputLen - offSet);
      data.copy(tempBuffer, 0, offSet, inputLen);
      const cacheStr = publicK.encrypt(tempBuffer, "RSAES-PKCS1-V1_5");
      cache = Buffer.from(cacheStr, "binary");
    }
    console.log(cache.length);
    console.log(cache);
    resultArray.push(cache);

    i++;
    offSet = i * 117;
  }
  const result = Buffer.concat(resultArray);
  return result.toString("base64");
};

const decrypt = (plainText: string, publicKeyStr: string) => {
  const publicK = forge.pki.publicKeyFromPem(qianzhui + publicKeyStr + houzhui);

  const data = Buffer.from(plainText, "base64");
  console.log(data);
  const inputLen = data.length;
  let offSet = 0;
  let cache;
  let resultArray = [];
  let i = 0;
  while (inputLen - offSet > 0) {
    if (inputLen - offSet > 128) {
      let tempBuffer = Buffer.alloc(117);
      data.copy(tempBuffer, 0, offSet, offSet + 117);
      const cacheStr = publicK.decrypt(tempBuffer, "RSAES-PKCS1-V1_5");
      cache = Buffer.from(cacheStr, "binary");
      // cache = cipher.doFinal(encryptedData, offSet, 128);
    } else {
      let tempBuffer = Buffer.alloc(117);
      data.copy(tempBuffer, 0, offSet, offSet + 117);
      const cacheStr = publicK.decrypt(tempBuffer, "RSAES-PKCS1-V1_5");
      cache = Buffer.from(cacheStr, "binary");
    }
    resultArray.push(cache);
    i++;
    offSet = i * 117;
  }
};

// let testStr =
//   "Cj2MfGmBwRTpCP8OdaqDS2XErktzdkV9h01SHBxeJIKWPNVqaKcffdPjoUv7JCz/uroG93YY+yidyjC5SlhwBbesw6UIXZu3Ggufewli6nKWBxyUwK7Rc97cBZSfDcEhtGzt3SN/q06ZbK9I2+5phbOrqlugwCrW+Z9J3c6CzaWvMXo1s9ClxyJ60l9XJWq2KS+Nd1apQYFs/J7PoLRCNDdC6dpECWDxfYYIwD5KtgfoeUjMeOV8GUcMWpaz9Wq3+TWkkxZN5ZVPyOHMYWyTcN2IdWUkLioDZuHk36y85JEkjXflECB5c0x0dZMG6AFqXy1pSoaKVpB7e++zxjo48gGzUMAuJ5JVx2P4qyQD/+kNsEdtfxmM9D5AoEVtWZOTHOeDEYw376Iu1AfIJqTDOxaXpXYCC6kHH+NiVtehVOGRneBZaAFMH3MQYPD8AuukgFD8dySIqLaNBembYR2BMKA/3rRlMIq2pzz+ivxPkGcSu2RwOayo1wdB8WjwoASlgOc3zsgSM4UqpbblacVFn3bcwBlo3QNYwksNpUNTUGgsNjL3LlnNDP1fQ6U6aATmd82n4YDhEkj836m+m9UgjzKIg152gY0rbHRR6lDjDCPPuymz4xAvTiagki3NTZGfYwjwoH4AyRIHlz2ARP2rSW25wY89CSZTCD9KSs9mvKgcx01/CRmadjKXhZmZnC392nkBBwlTocAkSL6AsDujGRBx5LPo1h93+YxdQ4+jjAE/W+qjYP+zxcsFBy2Y2HRDIobxBDD1uOm10n3/ZVKujx5yqDL2bACpfYZOXDisuNySpPZPu2Z26SlYphvJI980C5SRiatfUgJep9N6YL+IWgZtESASrwFNbp/FoRq26UUozFv+vXv5NtHtKPBUIISTrkx74253EOLypKHuk4XUS1pszVtyuCt7omtbWa12qyI4V37js6xjTYyZaI0a6Z8EZqXASiHRw1fus4v42V/gEvzic2d/BIW9EEf137fVvADEPp95FmmHT9+9kAJ2lDW3";
// //  testStr = "";
// fetch(decryptServiceUrl + testStr).then((dncryptRes) => {
//   dncryptRes.text().then((dncryptText) => {
//     console.log(dncryptText);
//     const json = JSON.parse(dncryptText);
//     console.log(json);
//   });
// });

// // 测试交易订单号0000000020220905100905000051;
// const testCId = "0000000020220912104043000052";
// const test2aa = "049202209131040440410920067";
// const queryInfo = {
//   merId: testMerId,
//   termId: testTermId,
//   tranDate: moment().format("YYYYMMDD"),
//   tranTime: moment().format("HHmmss"), //104043
//   merOrderNo: "0000000020220905111705000255", //getContractId("00000000", "000001"),
//   oldMerOrderNo: "0000000020220905144237000059",
// };
// console.log(queryInfo);

// const plainText = encrypt(JSON.stringify(queryInfo), newPublicKey);
// console.log(plainText);
// fetch(remoteQueryPath + testMerId, {
//   method: "POST",
//   body: plainText,
//   headers: {
//     MerchantId: testMerId,
//   },
// }).then((serverRes) => {
//   console.log(serverRes);
//   serverRes.text().then((text) => {
//     console.log(text);
//     if (text.indexOf("原交易不存在") > -1) {
//       return;
//     }

//     fetch(decryptServiceUrl + text).then((dncryptRes) => {
//       dncryptRes.text().then((dncryptText) => {
//         console.log(dncryptText);
//         const json = JSON.parse(dncryptText);
//         console.log(json);
//       });
//     });

//     // try {
//     //   console.log("-------------");
//     //   const cdCmd = `cd ${__dirname}/../ `;
//     //   const javaCmd = `java RSAEncryptByPubk ` + text;
//     //   const cmd = cdCmd + " && " + javaCmd;
//     //   exec(cmd, (error, stdout, stderr) => {
//     //     //todo window会有乱码，解决方法见http://t.zoukankan.com/daysme-p-15795143.html，其他系统应无乱码，因此暂不解决
//     //     console.log(stdout);
//     //     const json = JSON.parse(stdout);
//     //     //todo 失败暂不考虑
//     //     console.log("json");
//     //     console.log(json);
//     //   });
//     // } catch (e) {
//     //   console.log(e);
//     // }
//   });
// });
