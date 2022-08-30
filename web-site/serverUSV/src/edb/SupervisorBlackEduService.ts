import { SupervisorBlackEdu } from "../entity/SupervisorBlackEdu";
import { EduOrg } from "../entity/EduOrg";

import mysql from "../mysql";
import { nullableFuzzy } from "../Util";
class SupervisorBlackEduService {
  //新增
  async create(edu: SupervisorBlackEdu) {
    await mysql.getRepository(SupervisorBlackEdu).save({ ...edu });
    return { result: true, msg: "加入成功" };
  }

  /**
   *
   * 移除
   *     */
  async remove(eduO: SupervisorBlackEdu) {
    console.log("删除内容是:" + eduO);
    if (eduO != null && eduO.eduId != null) {
      const result = await mysql.getRepository(SupervisorBlackEdu).remove(eduO);
      return { result: true };
    } else {
      return { result: false };
    }
  }
  /**
   * 获取黑名单信息
   * by wqy
   * @param eduId
   * @returns
   */
  async findOne(eduId) {
    const result = await mysql
      .getRepository(SupervisorBlackEdu)
      .findOneBy(eduId);
    return result;
  }
  async findAll(reqParams) {
    let { page, size, eduName } = reqParams;
    if (page == null) {
      page = 0;
    }
    if (size == null) {
      size = 8;
    }
    const resultMap = await mysql
      .getRepository(SupervisorBlackEdu)
      .createQueryBuilder("blackEdu") // 创建查询生成器，supervisorBlackEdu生成对象
      .leftJoinAndSelect(EduOrg, "eduOrg", "blackEdu.eduId = eduOrg.eduId")
      .select(
        `
      blackEdu.eduId as blackEdu_edu_id,
      eduOrg.eduId as eduId, 
      eduOrg.eduName as eduName,
      blackEdu.blackEduCreateDate as blackEduCreateDate,
      blackEdu.blackEduCreateTime as blackEduCreateTime,
      blackEdu.blackEduCreateReason as blackEduCreateReason
    `
      )
      .where("eduOrg.eduName like :eduName", {
        eduName: nullableFuzzy(eduName),
      })
      .skip(page * size)
      .take(size)
      .getRawMany(); // 最后查询出全部

    console.log(`黑名单查询结果[${JSON.stringify(resultMap)}]`);
    //resultMap[1]
    return { result: true, records: resultMap, total: 4 };
  }
}

export default new SupervisorBlackEduService();
