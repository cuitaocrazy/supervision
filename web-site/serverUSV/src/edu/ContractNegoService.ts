import { ContractNego } from "../entity/ContractNego";
import mysql from "../mysql";
import { nullableFuzzy } from "../Util";

class ContractNegoService {
  async find(req) {
    let { lessonName, eduId, page, size } = req;
    if (page == null) {
      page = 0;
    }
    if (size == null) {
      size = 20;
    }
    req.page = undefined;
    req.size = undefined;
    const contractNegos = await mysql
      .getRepository(ContractNego)
      .createQueryBuilder("contractNego")
      .where(
        "contractNego.lessonName like :lessonName and contractNego.eduId = :eduId",
        {
          lessonName: nullableFuzzy(lessonName),
          eduId: eduId,
        }
      )
      // .skip(page*size)
      //todo 方便测试
      .skip(0)
      .take(size)
      .getManyAndCount();
    return { result: true, records: contractNegos[0], total: contractNegos[1] };

    // const records = await mysql.getRepository(Contract).findBy(req)
    // return { result: true, records: records }
  }

  async findOne(req) {
    let { negoId } = req;
    const contractNego = await mysql
      .getRepository(ContractNego)
      .createQueryBuilder("contractNego")
      .where("contractNego.negoId = :negoId", {
        negoId: negoId,
      })
      .getOne();
    return contractNego;
  }

  async save(nego: ContractNego) {
    const result = await mysql.getRepository(ContractNego).save(nego);
    return result;
  }
}
export default new ContractNegoService();
