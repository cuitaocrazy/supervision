import { EduLesson } from '../entity/EduLesson'
import { EduOrg } from '../entity/EduOrg'
import mysql from '../mysql'

class EduLessonService {
    async find(req) {
        const eduLessons = await mysql.getRepository(EduLesson).findBy(req)
        const records = await Promise.all(eduLessons.map(async lesson => {
            const org = await mysql.getRepository(EduOrg).findOneBy({ eduId: lesson.eduId })
            return { ...lesson, eduOrg: org }
        }))
        return { result: true, records: records }
    }
}
export default new EduLessonService()