import { EduOrg } from "../entity/EduOrg";
import mysql from "../mysql";
import { nullableFuzzy } from "../Util";
class EduOrgService {
  async find(reqParams) {
    let { page, size, eduName } = reqParams;
    if (page == null) {
      page = 0;
    }
    if (size == null) {
      size = 10;
    }
    const records = await mysql
      .getRepository(EduOrg)
      .createQueryBuilder("eduOrg")
      .where("eduOrg.eduName like :name ", {
        name: nullableFuzzy(eduName),
      })
      .skip(page * size)
      .take(size)
      .getManyAndCount(); // 最后查询出全部
    console.log(`教育机构查询[${JSON.stringify(records)}]`);

    return { result: true, records: records[0], total: records[1] };
  }
  //新增
  async create(edu: EduOrg) {
    await mysql.getRepository(EduOrg).save({ ...edu });
    return { result: true, msg: "插入成功" };
  }
  //编辑
  async editSave(req: EduOrg) {
    await mysql.getRepository(EduOrg).save({ ...req });
    return { result: true, msg: "更新成功" };
  }

  /**
   *
   * 移除
   *     */
  async remove(eduO: EduOrg) {
    console.log("删除内容是:" + eduO);
    if (eduO != null && eduO.eduId != null) {
      const result = await mysql.getRepository(EduOrg).remove(eduO);
      return { result: true };
    } else {
      return { result: false };
    }
  }
  /**
   * 模糊搜索
   * @param eduName  机构名称
   */
  async findByEduName(eduName: string) {
    const li = await mysql
      .getRepository(EduOrg)
      .createQueryBuilder("eduorg")
      .where("eduorg.eduName list :eduName", {
        eduName: nullableFuzzy(eduName),
      }).getMany;
    console.log("查询结果" + li.length + "条");
    return li;
  }
}

export default new EduOrgService();
