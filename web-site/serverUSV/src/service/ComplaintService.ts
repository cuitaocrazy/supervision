import moment = require("moment");
import { ServiceResult } from "../Util";
import { Complaint } from "../entity/Complaint";
import mysql from '../mysql';
import { Consumer } from "../entity/Consumer";
import { EduOrg } from "../entity/EduOrg";
import { Like } from "typeorm";
/**
 * 投诉保存处理
 * @param req 投诉请求
 */
export const create = async (req: Pick<Complaint, 'consumerId' | 'eduId' | 'complaintTitle' | 'complaintContent' | 'complaintType'>): Promise<ServiceResult> => {
    const consumer = await mysql.getRepository(Consumer)
        .findOneByOrFail({
            consumerLoginName: req.consumerId
        })
    const eduOrg = await mysql.getRepository(EduOrg)
        .findOneByOrFail({
            eduId: req.eduId
        })
    const saveObj: Complaint = {
        ...req,
        complaintDate: moment().format("YYYYMMDD"),
        complaintTime: moment().format("HHmmss"),
        consumerName: consumer.consumerName,
        consumerPhone: consumer.consumerPhone,
        eduName: eduOrg.eduName,
        eduContact: eduOrg.eduContact,
        eduContactPhone: eduOrg.eduContactPhone,
        complaintStatus: 'pending',
        complaintGrade: 'normal',
        complaintDescResu: '',
    }
    await mysql
        .getRepository(Complaint)
        .save(saveObj);
    return { result: true, msg: '保存成功' };
}

export const find = async (req: Pick<Complaint, 'complaintTitle'>): Promise<ServiceResult> => {
    const [objs, pageNum] = await mysql
        .getRepository(Complaint)
        .findAndCountBy(req.complaintTitle ? {
            complaintTitle: Like(`%${req.complaintTitle}%`)
        } : {})
    return { result: true, msg: '查询成功', page: { objs, pageNum } };
}