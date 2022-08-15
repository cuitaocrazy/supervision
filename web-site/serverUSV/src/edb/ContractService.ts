import { Contract } from '../entity/Contract'
import mysql from '../mysql'

class ContractService {
    


    async count() {
     // const { sum } = await dataSource
    // .getRepository(Contract)
    // .createQueryBuilder("contract")
    // .select("SUM(contract.lessonTotalQuantity)", "sum")
    // .getRawOne()
        const count =await mysql.getRepository(Contract).count();
        return count
    }
}

export default new ContractService()