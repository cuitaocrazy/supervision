import { EduLesson } from '../entity/EduLesson'
import { Contract } from '../entity/Contract'
import { EduOrg } from '../entity/EduOrg'
import { EduTeacher } from '../entity/EduTeacher'
import { Attendance } from '../entity/Attendance'
import {Transfer} from '../entity/Transfer'

import mysql from '../mysql'
import {nullableFuzzy} from '../Util'
import e = require('express')

// export const searchLesson =  async ({ page, size,searchValue }) => {
//     const result = await mysql.getRepository(EduLesson).findBy({
//         lessonStatus: 'on',
//     })
//     return result
// }

export const searchLesson = async (reqParams) =>{
    let {page,size,queryStr} = reqParams
    if(page==null){
        page=0
    }
    if(size==null){
        size=10
    }
    reqParams.page=undefined
    reqParams.size=undefined    

    const lessons =await mysql.getRepository(EduLesson).createQueryBuilder("eduLesson")

    .where("eduLesson.lessonStatus = 'on' and (eduLesson.lessonName like :queryStr or eduLesson.eduName like :queryStr) ", { queryStr: nullableFuzzy(queryStr) })
    // .skip(page*size)
    //todo 方便测试
    .skip(0)
    .take(size).getManyAndCount()
    return lessons[0]
}



export const searchContract =  async (reqParams) => {
    let {page,size} = reqParams
    if(page==null){
        page=0
    }
    if(size==null){
        size=10
    }
    reqParams.page=undefined
    reqParams.size=undefined   


    // const result = await mysql.getRepository(Contract).findBy(searchValue)

    const contracts =await mysql.getRepository(Contract).createQueryBuilder("contract")

    // .skip(page*size)
    //todo 方便测试
    .skip(0)
    .take(size).getManyAndCount()
    return contracts[0]
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

// export const findAttendance = async ({ lessonId,consumerId,lessonQuantity }) => {
//     const result = await mysql.getRepository(Attendance).findOneBy({
//         lessonId: lessonId,
//         consumerId:consumerId,
//         attendanceLessonQuantity:lessonQuantity
//     })

//     if (result === null)
//     throw e;
//     return result
// }

export const findAttendance = async ({ lessonId,consumerId }) => {
    const result = await mysql.getRepository(Attendance).findBy({
        lessonId: lessonId,
        consumerId:consumerId
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



