import { EduLesson } from '../entity/EduLesson'
import { Contract } from '../entity/Contract'
import { EduOrg } from '../entity/EduOrg'
import { EduTeacher } from '../entity/EduTeacher'
import { Attendance } from '../entity/Attendance'
import {Transfer} from '../entity/Transfer'

import mysql from '../mysql'
import e = require('express')

export const searchLesson =  async ({ page, size,searchValue }) => {
    const result = await mysql.getRepository(EduLesson).findBy({
        lessonStatus: 'on',
    })
    return result
}

export const searchContract =  async ({ page, size,searchValue }) => {
    const result = await mysql.getRepository(Contract).findBy(searchValue)
    return result
}

export const saveContract =  async (contract) => {
    const result = await mysql.getRepository(Contract).save(contract)
    return result
}

export const saveTransfer = async (transfer) => {
    const result = await mysql.getRepository(Transfer).save(transfer)
    return result
}


export const findOneContract = async ({ contractId }) => {
    const result = await mysql.getRepository(Contract).findOneBy({
        contractId: contractId
    })
    if (result === null)
    throw e;
    return result
}

export const findOneAttendance = async ({ lessonId,consumerId,lessonQuantity }) => {
    const result = await mysql.getRepository(Attendance).findOneBy({
        lessonId: lessonId,
        consumerId:consumerId,
        attendanceLessonQuantity:lessonQuantity
    })

    if (result === null)
    throw e;
    return result
}

export const findOneLesson = async ({ lessonId }) => {
    const result = await mysql.getRepository(EduLesson).findOneBy({
        lessonId: lessonId
    })

    if (result === null)
    throw e;
    return result
}

export const findOneEdu = async ({ eduId }) => {
    const result = await mysql.getRepository(EduOrg).findOneBy({
        eduId: eduId
    })

    if (result === null)
    throw e;
    return result
}

export const findOneTeacher = async ({ teacherId }) => {
    const result = await mysql.getRepository(EduTeacher).findOneBy({
        teacherId: teacherId
    })

    if (result === null)
    throw e;
    return result
}

export const saveAttendance =  async (attendance) => {
    const result = await mysql.getRepository(Attendance).save(attendance)
    return result
}



