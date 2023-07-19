import moment = require("moment");
import { EduTeacher } from "../entity/EduTeacher";
import mysql from "../mysql";
import { nullableFuzzy } from "../Util";
class EdbTeacherService {
  async findOne(teacherId) {
    const result = await mysql.getRepository(EduTeacher).findOneBy({
      teacherId: teacherId,
    });
    return result;
  }

  async remove(teacher: EduTeacher) {
    const result = await mysql.getRepository(EduTeacher).remove(teacher);
    return { result: true };
  }

  async find(reqParams) {
    let { page, size, teacherName } = reqParams;
    if (page == null) {
      page = 0;
    }
    if (size == null) {
      size = 20;
    }
    const eduTeachers = await mysql
      .getRepository(EduTeacher)
      .createQueryBuilder("teacher")
      .leftJoinAndSelect("teacher.eduOrg", "eduOrg")
      .leftJoinAndSelect("eduOrg.supervisorOrg", "supervisorOrg")
      .where("teacher.teacherName like :name ", {
        name: nullableFuzzy(teacherName),
      })
      .orderBy("teacher.teacherCreateDate", "DESC")
      .addOrderBy("teacher.teacherCreateTime", "DESC")
      .skip(page * size)
      .take(size)
      .getManyAndCount();
    return { result: true, records: eduTeachers[0], total: eduTeachers[1] };
  }

  async save(eduTeacher: EduTeacher) {
    await mysql.manager.save(eduTeacher);
  }
  async saveEduTeacher(eduTeacher: EduTeacher) {
    const result = await mysql.getRepository(EduTeacher).save(eduTeacher);
    return result;
  }

  async findAll() {
    const data = await mysql
      .getRepository(EduTeacher)
      .createQueryBuilder("teacher")
      .select("teacher_id as dataId, teacher_name as dataName")
      .orderBy("teacher_create_date", "DESC")
      .addOrderBy("teacher_create_time", "DESC")
      .getRawMany();
    return { result: true, data };
  }
}
export default new EdbTeacherService();
