import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import fetch from "node-fetch";
import { SubscribeWithSign } from "./API";
import { sign } from "jws";
import * as cors from "cors";
import { EventEmitter } from "events";
const forge = require("node-forge");
const NodeRSA = require("node-rsa");
const app = express();
app.use(cors());
app.use(express.static("out"));
import * as cc from "./ccClientService/USVClient";
//查询后台是否交易成功的最大次数。
const QUERYPAYMENTMAX = 60;
const DECRYPT_SERVER_PATH = process.env.DECRYPT_SERVER_PATH || "localhost:2999";
console.log(process.env.DECRYPT_SERVER_PATH);
// const decryptServiceUrl = "http://localhost:2999/encrypt?plainText=";
const decryptServiceUrl = `http://${DECRYPT_SERVER_PATH}/encrypt?plainText=`;
// ("http://supervision-demo-encrypt:2999/encrypt?plainText=");

const port = 3003;
const jsonParser = bodyParser.json();

const appID = "12345";
const key = "abcdef";

var emitter = new EventEmitter();

app.get("/test", (req, res) => {
  res.send("test connect");
});

app.get("/api/test", (req, res) => {
  res.send("api test connect");
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
  return randomUUID().replaceAll("-", "");
};

const signSubscribe = (body: SubscribeWithSign) => {
  const signResult = sign({
    header: { alg: "HS256" },
    payload: body,
    secret: key,
  });
  return signResult;
};

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
import eduContractNegoService from "./src/edu/ContractNegoService";
app.get("/edu/teacher/find", async (req, res) => {
  console.log(`教育机构: 查询教师: 条件[${JSON.stringify(req.query)}]`);
  const r = await eduTeacherService.find(req.query);
  r.records.map((record: any) => {
    record.teacherCreateDate = dateFormat(record.teacherCreateDate);
    record.teacherCreateTime = timeFormat(record.teacherCreateTime);
    record.teacherUpdateDate = dateFormat(record.teacherUpdateDate);
    record.teacherUpdateTime = timeFormat(record.teacherUpdateTime);
  });
  res.send(r);
});
app.get("/edu/transaction/find", async (req, res) => {
  console.log(`教育机构: 查询流水信息: 条件[${JSON.stringify(req.query)}]`);
  const loginName = req.query.loginName;
  const edu = await EduService.findByLoginName(loginName);
  const r = await eduTransactionService.query(
    req.query,
    edu.eduSupervisedAccount || ""
  );
  r.records.map((record: any) => {
    record.transactionAmt = fenToYuan(record.transactionAmt);
  });
  res.send(r);
});

app.get("/edu/contractNego/find", async (req, res) => {
  console.log(`教育机构: 查询争议合同信息: 条件[${JSON.stringify(req.query)}]`);
  const loginName = req.query.loginName;
  const lessonName = req.query.lessonName;
  const edu = await EduService.findByLoginName(loginName);
  console.log(edu);
  console.log("edu");
  if (edu == null) {
    res.send({ records: [], result: "fail", total: 0 });
    return;
  }
  const r = await eduContractNegoService.find({
    lessonName: lessonName,
    eduId: edu.eduId,
  });

  await Promise.all(
    r.records.map(async (record: any) => {
      record.negoRefundAmt = fenToYuan(record.negoRefundAmt);
      record.negoCompensationAmt = fenToYuan(record.negoCompensationAmt);
      record.contract = await eduContractService.findOne(record.contractId);
      return record;
    })
  );

  res.send(r);
});

app.post("/edu/contractNego/audit", jsonParser, async (req, res) => {
  // record.negoRefundAmt = fenToYuan(record.negoRefundAmt);
  // record.negoCompensationAmt = fenToYuan(record.negoCompensationAmt);
  const { negoRefundAmt, negoCompensationAmt, negoId } = req.body;
  const oldNego = await eduContractNegoService.findOne({
    negoId: negoId,
  });
  console.log(
    parseInt(String(oldNego.negoCompensationAmt)) +
      parseInt(String(oldNego.negoRefundAmt))
  );
  console.log(yuanToFen(negoRefundAmt) + yuanToFen(negoCompensationAmt));
  if (
    parseInt(String(oldNego.negoCompensationAmt)) +
      parseInt(String(oldNego.negoRefundAmt)) !=
    yuanToFen(negoRefundAmt) + yuanToFen(negoCompensationAmt)
  ) {
    res.send({ result: false, msg: "未知异常" });
    return;
  } else if (
    parseInt(String(oldNego.negoRefundAmt)) == yuanToFen(negoRefundAmt)
  ) {
    //todo 进行退货交易
    oldNego.negoEduAgree = true;
    oldNego.negoEduAgreeDate = moment().format("YYYYMMDD");
    oldNego.negoEduAgreeTime = moment().format("HHmmss");
    oldNego.negoStatus = "complete";
    await eduContractNegoService.save(oldNego);
    const edu = await EduService.findByEduId(oldNego.eduId);
    oldNego.eduId;
    const newTransaction = {
      transactionId: getTransactionId(),
      contractId: oldNego.contractId,
      transactionAmt: -1 * oldNego.negoRefundAmt,
      tranType: "refund",
      tranDate: moment().format("YYYYMMDD"),
      tranTime: moment().format("HHmmss"),
      eduSupervisedAccount: edu.eduSupervisedAccount,
    };
    saveTransaction(newTransaction);
    res.send({ result: true, msg: "已退货" });
    return;
  } else {
    oldNego.negoEduAgree = true;
    oldNego.negoEduAgreeDate = moment().format("YYYYMMDD");
    oldNego.negoEduAgreeDate = moment().format("HHmmss");
    oldNego.negoConsumerAgree = false;
    oldNego.negoCompensationAmt = yuanToFen(negoCompensationAmt);
    oldNego.negoRefundAmt = yuanToFen(negoRefundAmt);
    await eduContractNegoService.save(oldNego);
    res.send({ result: true, msg: "已将诉求告知消费者" });
    return;
  }
});

app.get("/edu/transaction/sum", async (req, res) => {
  console.log(`教育机构: 查询汇总信息: 条件[${JSON.stringify(req.query)}]`);
  const loginName = req.query.loginName;
  const date = req.query.date;
  const edu = await EduService.findByLoginName(loginName);
  if (!edu) {
    console.log(`教育机构: 查询汇总信息: 登陆名[${loginName}]没有找到教育机构`);
    return { result: false, reason: `登陆名称[${loginName}]没有找到教育机构` };
  }
  const contractSum = await eduContractService.sum(edu.eduId || "");
  const saBalance = await eduTransactionService.balanceQuery(
    edu.eduSupervisedAccount
  );

  const r = await eduTransactionService.sum(edu.eduSupervisedAccount, date);
  const result = {
    ...contractSum,
    ...r,
    ...{
      balance: fenToYuan(saBalance),
      supervisedAccount: edu.eduSupervisedAccount,
    },
  };
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
    teacher.teacherCreateDate = teacher.teacherCreateDate.replaceAll("-", "");
    teacher.teacherCreateTime = teacher.teacherCreateTime.replaceAll(":", "");
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
    lesson.lessonStartDate = dateFormat(lesson.lessonStartDate);
    lesson.lessonEndDate = dateFormat(lesson.lessonEndDate);
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

  lesson.teacherId = req.body.teacherId;
  const teacher = await findOneTeacher({ teacherId: lesson.teacherId });
  lesson.teacherName = teacher.teacherName;

  lesson.eduId = req.body.eduId;
  lesson.eduName = req.body.eduName;
  lesson.lessonImages =
    "https://s3.bmp.ovh/imgs/2022/08/30/28f95385d82b4f7c.jpg"; //'http://placekitten.com/g/200/300'
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
  lesson.lessonStatus = req.body.lessonStatus;
  lesson.lessonAccumulationQuantity = 0;
  lesson.teacherId = req.body.teacherId;
  const teacher = await findOneTeacher({ teacherId: lesson.teacherId });
  lesson.teacherName = teacher.teacherName;
  lesson.eduId = req.body.eduId;
  lesson.eduName = req.body.eduName;
  lesson.lessonImages =
    "https://s3.bmp.ovh/imgs/2022/08/30/28f95385d82b4f7c.jpg"; //'http://placekitten.com/g/200/300'
  lesson.lessonOutline = false;
  lesson.lessonStartTime = "000000";
  lesson.lessonEndTime = "000000";
  lesson.lessonUpdateDate = moment().format("YYYYMMDD");
  lesson.lessonUpdateTime = moment().format("HHmmss");
  lesson.lessonUpdateReason = "编辑课程";
  lesson.eduName = "北京亚大教育机构";
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
  findOneContractNego,
  saveAttendance,
  saveTransaction,
  getNextSeq,
  findTransactions,
  saveContractNego,
  searchContractNego,
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
const get3order = async () => {
  return {
    orderNo: randomUUID().replaceAll("-", ""),
  };
};

const getRandomId = () => {
  return randomUUID().replaceAll("-", "");
};

const getContractId = (eduMerNo, seq) => {
  return moment().format("YYYYMMDDHHmmss") + eduMerNo + seq;
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
          "https://s3.bmp.ovh/imgs/2022/08/30/28f95385d82b4f7c.jpg"; //"http://placekitten.com/g/200/300"
      }
      return lesson;
    })
  );
  res.send({ status: "success", result: convertLessonList });
});

app.put("/consumer/refund", jsonParser, async (req, res) => {
  console.log(`教育局: 查询教师: 条件[${JSON.stringify(req.body)}]`);
  const { contractId, userId, refundAmt, reason } = req.body;
  const refundAmtfen = yuanToFen(refundAmt);

  var negoTransfered = 0;
  const contract = await findOneContract({ contractId: contractId });

  const transactions = await findTransactions({
    contractId: contractId,
  });
  console.log(transactions.length);
  transactions.map((record) => {
    negoTransfered = negoTransfered + parseInt(String(record.transactionAmt));
  });

  var negoRemain = negoTransfered;
  if (negoRemain <= 0 || negoRemain < refundAmtfen) {
    res.send({ status: "false", result: "剩余金额不足退还所需金额" });
    return;
  }
  if (contract.contractStatus == "nego") {
    const contractNego = await findOneContractNego({ contractId: contractId });
    if (contractNego == null || contractNego.negoConsumerAgree) {
      res.send({
        status: "false",
        result: "该订单目前已处于协商中，不可再次发起退货",
      });
    } else {
      var negoRemain = negoTransfered;
      contractNego.negoConsumerAgree = true;
      contractNego.negoEduAgree = false;
      contractNego.negoRefundAmt = refundAmtfen;
      contractNego.negoCompensationAmt = negoRemain - refundAmtfen;
      saveContractNego(contractNego);
      console.log("saveContractNego");
      res.send({ status: "success", result: "退货申请成功" });
    }
    return;
  }
  if (contract.contractStatus != "valid") {
    res.send({ status: "false", result: "该订单目前不可发起退货" });
    return;
  }

  contract.contractStatus = "nego";
  await saveContract(contract);
  console.log("saveContract");
  const contractNego: ContractNego = {
    negoId: getRandomId(),
    contractId: contractId,
    negoType: "refund",
    negoReason: reason,
    negoCreator: "consumer",
    negoStatus: "negotiating",
    negoCreateDate: moment().format("YYYYMMDD"),
    negoCreateTime: moment().format("HHmmss"),
    negoUpdateDate: moment().format("YYYYMMDD"),
    negoUpdateTime: moment().format("HHmmss"),
    negoRefundAmt: refundAmtfen,
    negoCompensationAmt: negoRemain - refundAmtfen,
    negoConsumerAgree: true,
    negoConsumerAgreeDate: moment().format("YYYYMMDD"),
    negoConsumerAgreeTime: moment().format("HHmmss"),
    negoEduAgree: false,
    negoEduAgreeDate: "",
    negoEduAgreeTime: "",
    lessonName: contract.lessonName,
    lessonId: contract.lessonId,
    eduId: contract.eduId,
    eduName: contract.eduName,
    consumerId: contract.consumerId,
    consumerName: contract.consumerName,
  };
  saveContractNego(contractNego);
  console.log("saveContractNego");
  res.send({ status: "success", result: "退货申请成功" });
});

io.on("connection", function (socket) {
  // socket相关
  console.log("some consumer connection");
  socket.emit("open");

  socket.on("pay", async function (contractId) {
    emitter.once(contractId + "_paySuccess", function () {
      console.log("do pay emit");
      socket.emit(contractId + "_pay", "Success");
    });
  });
});

app.post("/consumer/preOrder", jsonParser, async (req, res) => {
  //todo
  const { userId, username } = await getUserInfoByToken();
  const { lessonId, studentName } = req.body;
  const otherSystemInfo = await get3order();
  try {
    const lesson = await findOneLesson({ lessonId: lessonId });
    const edu = await findOneEdu({ eduId: lesson.eduId });
    const teacher = await findOneTeacher({ teacherId: lesson.teacherId });
    const seq = await getNextSeq();
    //todo 合同状态
    const newContract = {
      //todo 实际的终端ID
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

app.get("/consumer/refundContractList", jsonParser, async (req, res) => {
  let orderList = await searchContract({
    ...req.query,
    ...{ contractStatus: "nego" },
  });
  orderList.map((contract) => {
    contract.lessonTotalPrice = fenToYuan(contract.lessonTotalPrice);
    contract.lessonPerPrice = fenToYuan(contract.lessonPerPrice);
    return contract;
  });
  res.send({ status: "success", result: orderList });
});

app.get("/consumer/contractNego", jsonParser, async (req, res) => {
  let nego = await searchContractNego({
    ...req.query,
  });
  nego.negoRefundAmt = fenToYuan(nego.negoRefundAmt);
  nego.negoCompensationAmt = fenToYuan(nego.negoCompensationAmt);
  res.send({ status: "success", result: nego });
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
      transactionAmt: -1 * transfer.transferAmt,
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
  r.records.map((record: any) => {
    record.teacherCreateDate = dateFormat(record.teacherCreateDate);
    record.teacherCreateTime = timeFormat(record.teacherCreateTime);
    record.teacherUpdateDate = dateFormat(record.teacherUpdateDate);
    record.teacherUpdateTime = timeFormat(record.teacherUpdateTime);
  });
  res.send(r);
});

app.get("/edb/eduOrg/find", async (req, res) => {
  console.log(`教育局: 查询教育机构: 条件[${req.query}]`);
  const r = await edbEduOrgService.find({ ...new EduOrg(), ...req.query });
  r.records.map((edu: EduOrg) => {
    edu.eduAnnualInspectionDate = dateFormat(edu.eduAnnualInspectionDate);
    edu.eduAnnualInspectionTime = timeFormat(edu.eduAnnualInspectionTime);
  });
  res.send(r);
});
import edbEduLessonService from "./src/edb/EduLessonService";
app.get("/edb/eduLesson/find", async (req, res) => {
  console.log(`教育局: 查询课程: 条件[${req.query}]`);
  const r = await edbEduLessonService.find(req.query);
  r.records.map((lesson: EduLesson) => {
    lesson.lessonStartDate = dateFormat(lesson.lessonStartDate);
    lesson.lessonEndDate = dateFormat(lesson.lessonEndDate);
  });
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
  const contractSum = await edbContractService.sum();
  const r = await edbTransactionService.sum(req.query.date);
  const saBalance = await edbTransactionService.balanceQuery({});
  console.log(saBalance);
  const result = {
    ...contractSum,
    ...r,
    ...{ balance: saBalance.records[0].sum },
  };
  res.send(result);
});

import edbAttendanceService from "./src/edb/AttendanceService";
import edbTransferService from "./src/edb/TransferService";
import edbContractService from "./src/edb/ContractService";
import { Transfer } from "./src/entity/Transfer";
import { EduLesson } from "./src/entity/EduLesson";
import { EduTeacher } from "./src/entity/EduTeacher";
import edbSupervisorUserService from "./src/edb/SupervisorService";
import edbContractNegoService from "./src/edb/ContractNegoService";
import TransferService from "./src/edu/TransferService";
import EduService from "./src/edu/EduService";
import { Transaction } from "fabric-network";
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

//app.use(express.json())
//新增
app.post("/edb/eduOrg/create", jsonParser, async (req, res) => {
  console.log(`教育局: 新增教育机构: 新增信息[${JSON.stringify(req.body)}]`);
  const edu: EduOrg = req.body;
  edu.eduStatus = "valid";
  edu.eduCreateDate = moment().format("YYYYMMDD");
  edu.eduCreateTime = moment().format("HHmmss");
  edu.eduId = geneUSVOrderNo(); //await getUUIDWithEM(mysql.manager)
  edu.eduPassword = "password";
  const r = await edbEduOrgService.create(edu);
  res.send(r);
});
//编辑
app.post("/edb/eduOrg/modify", jsonParser, async (req, res) => {
  console.log(`教育局: 更新教育机构: 更新信息[${JSON.stringify(req.body)}]`);
  const edu: EduOrg = req.body;
  edu.eduUpdateDate = moment().format("YYYYMMDD");
  edu.eduUpdateTime = moment().format("HHmmss");
  const r = await edbEduOrgService.editSave(edu);
  res.send(r);
});
//删除
app.post("/edb/eduOrg/del", jsonParser, async (req, res) => {
  console.log(`教育局: 删除教育机构: 条件[${JSON.stringify(req.body)}]`);

  const r = await edbEduOrgService.remove({ ...new EduOrg(), ...req.body });
  res.send(r);
});
import blackEduService from "./src/edb/SupervisorBlackEduService";
import { SupervisorBlackEdu } from "./src/entity/SupervisorBlackEdu";

/**
 * 加入黑名单
 */
app.post("/edb/eduOrg/apply", jsonParser, async (req, res) => {
  console.log(`教育局: 加入黑名单的教育机构信息[${JSON.stringify(req.body)}]`);
  const eduBlack: SupervisorBlackEdu = req.body;
  eduBlack.blackEduCreateDate = moment().format("YYYYMMDD");
  eduBlack.blackEduCreateTime = moment().format("HHmmss");
  const r = await blackEduService.create(eduBlack);
  res.send(r);
});
/**
 * 黑名单 查询
 * 教育机构名称，黑名单原因，添加日期、添加时间

 */
app.get("/edb/supervisorBackEdu/find", async (req, res) => {
  console.log(`教育局: 黑名单管理查询[${JSON.stringify(req.query)}]`);
  let eduList = await blackEduService.findAll(req.query);
  eduList.records.map((balck: SupervisorBlackEdu) => {
    balck.blackEduCreateDate = dateFormat(balck.blackEduCreateDate);
    balck.blackEduCreateTime = timeFormat(balck.blackEduCreateTime);
  });
  res.send(eduList);
});

app.delete("/edb/supervisorBackEdu/remove", jsonParser, async (req, res) => {
  console.log(`教育局: 删除指定黑名单: 条件[${JSON.stringify(req.body)}]`);
  const r = await blackEduService.remove({
    ...new SupervisorBlackEdu(),
    ...req.body,
  });
  res.send(r);
});

app.post("/edu/lesson/audit", jsonParser, async (req, res) => {
  console.log(`教育机构: 课程审核: 条件[${JSON.stringify(req.body)}]`);
  const r = await edbEduLessonService.update(req.body);
  res.send(r);
});
app.post("/edb/eduLesson/off", jsonParser, async (req, res) => {
  console.log(`教育局: 课程下架: 条件[${JSON.stringify(req.body)}]`);
  const r = await eduLessonService.off(req.body);
  res.send(r);
});

app.get("/edb/contractNego/find", async (req, res) => {
  console.log(`教育局: 查询争议合同信息: 条件[${JSON.stringify(req.query)}]`);

  const r = await edbContractNegoService.find(req.query);
  await Promise.all(
    r.records.map(async (record: any) => {
      record.negoRefundAmt = fenToYuan(record.negoRefundAmt);
      record.negoCompensationAmt = fenToYuan(record.negoCompensationAmt);
      record.contract = await edbContractService.findOne(record.contractId);
      return record;
    })
  );

  res.send(r);
});

app.post("/edb/contractNego/audit", jsonParser, async (req, res) => {
  // record.negoRefundAmt = fenToYuan(record.negoRefundAmt);
  // record.negoCompensationAmt = fenToYuan(record.negoCompensationAmt);
  const { negoRefundAmt, negoCompensationAmt, negoId } = req.body;
  const oldNego = await eduContractNegoService.findOne({
    negoId: negoId,
  });
  console.log(
    parseInt(String(oldNego.negoCompensationAmt)) +
      parseInt(String(oldNego.negoRefundAmt))
  );
  console.log(yuanToFen(negoRefundAmt) + yuanToFen(negoCompensationAmt));
  if (
    parseInt(String(oldNego.negoCompensationAmt)) +
      parseInt(String(oldNego.negoRefundAmt)) !=
    yuanToFen(negoRefundAmt) + yuanToFen(negoCompensationAmt)
  ) {
    res.send({ result: false, msg: "未知异常" });
    return;
  } else {
    oldNego.negoEduAgree = true;
    oldNego.negoEduAgreeDate = moment().format("YYYYMMDD");
    oldNego.negoEduAgreeDate = moment().format("HHmmss");
    oldNego.negoConsumerAgree = true;
    oldNego.negoConsumerAgreeDate = moment().format("YYYYMMDD");
    oldNego.negoConsumerAgreeTime = moment().format("HHmmss");
    oldNego.negoStatus = "complete";
    oldNego.negoCompensationAmt = yuanToFen(negoCompensationAmt);
    oldNego.negoRefundAmt = yuanToFen(negoRefundAmt);
    await eduContractNegoService.save(oldNego);
    const edu = await EduService.findByEduId(oldNego.eduId);
    const newTransaction = {
      transactionId: getTransactionId(),
      contractId: oldNego.contractId,
      transactionAmt: -1 * oldNego.negoRefundAmt,
      tranType: "refund",
      tranDate: moment().format("YYYYMMDD"),
      tranTime: moment().format("HHmmss"),
      eduSupervisedAccount: edu.eduSupervisedAccount,
    };
    saveTransaction(newTransaction);

    res.send({ result: true, msg: "已退货" });
    return;
  }
});

//日期格式话
const dateFormat = (dateStr: string) => {
  if (dateStr != null) {
    const y = dateStr.substring(0, 4);
    const m = dateStr.substring(4, 6);
    const d = dateStr.substring(6, 8);
    return y + "-" + m + "-" + d;
  } else return dateStr;
};
//时间格式话
const timeFormat = (dateStr: string) => {
  if (dateStr != null) {
    const y = dateStr.substring(0, 2);
    const m = dateStr.substring(2, 4);
    const d = dateStr.substring(4, 6);
    return y + ":" + m + ":" + d;
  } else return dateStr;
};
//监管端:公告政策

app.post("/edb/announcement/create", jsonParser, async (req, res) => {
  console.log(`教育局: 公告政策添加: 条件[${JSON.stringify(req.body)}]`);
  const info: Announcement = req.body;
  info.announcementStatus = "on";
  info.announcementDate = info.announcementDate?.replaceAll("-", "");
});
app.post("/edu/lesson/audit", jsonParser, async (req, res) => {
  console.log(`教育机构: 课程审核: 条件[${JSON.stringify(req.body)}]`);
  const r = await edbEduLessonService.update(req.body);
  res.send(r);
});
app.post("/edb/eduLesson/off", jsonParser, async (req, res) => {
  console.log(`教育局: 课程下架: 条件[${JSON.stringify(req.body)}]`);
  const r = await eduLessonService.off(req.body);
  res.send(r);
});
//监管端:公告政策

import announcementService from "./src/edb/AnnouncementService";
import { Announcement } from "./src/entity/Announcement";
import { ContractNego } from "./src/entity/ContractNego";
import EduLessonService from "./src/edb/EduLessonService";
import { Contract } from "./src/entity/Contract";
import { SimpleConsoleLogger } from "typeorm";
app.post("/edb/announcement/create", jsonParser, async (req, res) => {
  console.log(`教育局: 公告政策添加: 条件[${JSON.stringify(req.body)}]`);
  const info: Announcement = req.body;
  info.announcementStatus = "on";
  info.announcementDate = info.announcementDate?.replaceAll("-", "");

  info.announcementId = randomUUID().replaceAll("-", "");
  const r = await announcementService.save(info);
  res.send(r);
});
app.post("/edb/announcement/modify", jsonParser, async (req, res) => {
  console.log(`教育局: 更新教育机构: 更新信息[${JSON.stringify(req.body)}]`);
  const info: Announcement = req.body;
  if (info.announcementId != null) {
    info.announcementStatus = "on";
    info.announcementDate = info.announcementDate?.replaceAll("-", "");
    const r = await announcementService.save(info);
    res.send(r);
  } else res.send({ result: false, msg: "修改失败" });
});

app.get("/edb/announcement/find", async (req, res) => {
  console.log(`教育局: 公告政策查询:条件[${JSON.stringify(req.query)}]`);
  let r = await announcementService.find(req.query);
  r.records.map((item: Announcement) => {
    item.announcementDate = dateFormat(item.announcementDate);
  });
  res.send(r);
});

app.delete("/edb/announcement/del", jsonParser, async (req, res) => {
  console.log(`教育局: 公告政策删除: 条件[${JSON.stringify(req.body)}]`);
  const r = await announcementService.del({
    ...new Announcement(),
    ...req.body,
  });
  res.send(r);
});
app.post("/edb/announcement/offOn", jsonParser, async (req, res) => {
  console.log(`教育局: 公告政策状态更新: 条件[${JSON.stringify(req.body)}]`);
  const info: Announcement = req.body;
  const r = await announcementService.save(info);
  res.send(r);
});
//教师下拉字典
app.get("/edu/teacher/findAll", async (req, res) => {
  console.log(`教育局: 查询教师下拉数据: 条件[${JSON.stringify(req.query)}]`);
  const r = await edbTeacherService.findAll();
  res.send(r);
});

//轮询队列

const remotePath = "http://47.94.12.189:80/zj/test/";

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
  await saveContract(contract);
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

  //todo 不能依赖前台告知
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

    const plainText = encrypt(JSON.stringify(bankJson), newPublicKey);
    console.log(plainText);
    fetch(remotePayPath + testMerId, {
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
        fetch(decryptServiceUrl + text).then((dncryptRes) => {
          dncryptRes.text().then((dncryptText) => {
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

// const decrypt = (plainText: string, publicKeyStr: string) => {
//   const publicK = forge.pki.publicKeyFromPem(qianzhui + publicKeyStr + houzhui);

//   const data = Buffer.from(plainText, "base64");
//   console.log(data);
//   const inputLen = data.length;
//   let offSet = 0;
//   let cache;
//   let resultArray = [];
//   let i = 0;
//   while (inputLen - offSet > 0) {
//     if (inputLen - offSet > 128) {
//       let tempBuffer = Buffer.alloc(117);
//       data.copy(tempBuffer, 0, offSet, offSet + 117);
//       const cacheStr = publicK.decrypt(tempBuffer, "RSAES-PKCS1-V1_5");
//       cache = Buffer.from(cacheStr, "binary");
//       // cache = cipher.doFinal(encryptedData, offSet, 128);
//     } else {
//       let tempBuffer = Buffer.alloc(117);
//       data.copy(tempBuffer, 0, offSet, offSet + 117);
//       const cacheStr = publicK.decrypt(tempBuffer, "RSAES-PKCS1-V1_5");
//       cache = Buffer.from(cacheStr, "binary");
//     }
//     resultArray.push(cache);
//     i++;
//     offSet = i * 117;
//   }
// };
