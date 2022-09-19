import { Contract } from "../entity/Contract";
import mysql from "../mysql";

class ContractService {
  async count() {
    const count = await mysql.getRepository(Contract).count();
    return count;
  }
  async findOne(contractId) {
    const eduLesson = await mysql
      .getRepository(Contract)
      .createQueryBuilder("contract")

      .where("contract.contractId = :contractId ", {
        contractId: contractId,
      })
      // .skip(page*size)
      //todo 方便测试
      .getOne();
    return eduLesson;
    // const records = await mysql.getRepository(Contract).findBy(req)
    // return { result: true, records: records }
  }

  async sum() {
    const result = { contractValid: 0, contractFinish: 0 };
    const infos = await mysql
      .getRepository(Contract)
      .createQueryBuilder("contract")
      .select("count(*) count,contract.contract_status status")
      .groupBy("contract.contract_status")
      .getRawMany();
    if (infos == null) {
      return result;
    }
    infos.map((info) => {
      switch (info.status) {
        case "valid": {
          result.contractValid = info.count;
          break;
        }
        case "finished": {
          result.contractFinish += info.count;
          break;
        }
        case "terminnated": {
          result.contractFinish += info.count;
          break;
        }
      }
    });

    return result;
  }
}

export default new ContractService();
