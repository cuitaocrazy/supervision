import { EduOrg } from "../entity/EduOrg";
import mysql from "../mysql";
class EduService {
  async findByLoginName(loginName) {
    const result = await mysql.getRepository(EduOrg).findOneBy({
      eduLoginName: loginName,
    });
    return result;
  }
  async findByEduId(eduId) {
    const result = await mysql.getRepository(EduOrg).findOneBy({
      eduId: eduId,
    });
    return result;
  }
}
export default new EduService();
