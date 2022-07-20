import { stringify } from 'querystring'
import { EduLesson } from '../entity/EduLesson'
import { EduOrg } from '../entity/EduOrg'
import mysql from '../mysql'

const nullableFuzzy = (query:any)=>{
    return '%'.concat(query?query:'').concat('%')
}
class EduLessonService {

    async find(req) {
        let {page,size,eduName,status} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        req.page=undefined
        req.size=undefined
        console.log(nullableFuzzy(eduName))
        const eduLessons =await mysql.getRepository(EduLesson).createQueryBuilder("eduLesson")

        .where("eduLesson.eduName like :name and eduLesson.lessonStatus like :status", { name: nullableFuzzy(eduName),status:nullableFuzzy(status) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: eduLessons[0],total:eduLessons[1] }
    }

    async update(body){
        const {lessonStatus,lessonId} = body;
        const eduLesson = await mysql.getRepository(EduLesson).findOneBy({lessonId:lessonId})
        eduLesson.lessonStatus = lessonStatus;
        await mysql.getRepository(EduLesson).save(eduLesson)
        return { result: true }
    }
}
export default new EduLessonService()