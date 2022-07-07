import { EduLesson } from '../entity/EduLesson'
import { EduOrg } from '../entity/EduOrg'
import mysql from '../mysql'

class EduLessonService {
    async find(req) {
        const eduLessons = await mysql.getRepository(EduLesson).findBy(req)
        return { result: true, records: eduLessons }
    }
}
export default new EduLessonService()