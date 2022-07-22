import moment = require("moment");
import { EduTeacher } from "../entity/EduTeacher";
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'
class EduTeacherService {


    async findOne(teacherId){
        const result = await mysql.getRepository(EduTeacher).findOneBy({
            teacherId: teacherId
        })
        return result
    }

    async remove(teacher:EduTeacher){
        const result = await mysql.getRepository(EduTeacher).remove(teacher)
        return  { result: true}
    }
    
    async find(reqParams) {
        let {page,size,teacherName} = reqParams
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        reqParams.page=undefined
        reqParams.size=undefined    
        // const record = await mysql.getRepository(EduEduTeacher).findBy(reqParams)
        // if (record == null)
        //     return { result: true, records: [] }
        // return { result: true, records: [...record] }

        const eduTeachers =await mysql.getRepository(EduTeacher).createQueryBuilder("teacher")

        .where("teacher.teacherName like :name ", { name: nullableFuzzy(teacherName) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: eduTeachers[0],total:eduTeachers[1] }

    }


    async save(eduTeacher: EduTeacher) {
        await mysql.manager.save(eduTeacher)
    }
    async saveEduTeacher(eduTeacher:EduTeacher){
        const result = await mysql.getRepository(EduTeacher).save(eduTeacher)
        return result
    }

}
export default new EduTeacherService()