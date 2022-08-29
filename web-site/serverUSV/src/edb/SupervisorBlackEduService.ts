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
      .createQueryBuilder("blackEdu")
      //.leftJoinAndSelect(EduOrg, "eduOrg", "blackEdu.eduId=eduOrg.eduId")
      // 创建查询生成器，supervisorBlackEdu生成对象
      .leftJoinAndMapOne(
        "blackEdu.eduOrg",
        EduOrg,
        "eduOrg",
        "blackEdu.eduId=eduOrg.eduId"
      )
      .where("eduOrg.eduName like :eduName", {
        eduName: nullableFuzzy(eduName),
      })
      .skip(page * size)
      .take(size)
      .getManyAndCount();
    let arrAfter: SupervisorBlackEdu[] = [];
    if (resultMap[0].length > 0) {
      let r = resultMap[0];
      r.forEach((k) => {
        let item: SupervisorBlackEdu = new SupervisorBlackEdu();
        item.blackEduCreateDate = k.blackEduCreateDate;
        item.blackEduCreateTime = k.blackEduCreateTime;
        item.blackEduCreateReason = k.blackEduCreateReason;
        item.eduId = k.eduId;
        item.eduName = k.eduOrg.eduName;
        arrAfter.push(item);
      });
    }
    return { result: true, records: arrAfter, total: resultMap[1] };
  }
}

export default new SupervisorBlackEduService();
