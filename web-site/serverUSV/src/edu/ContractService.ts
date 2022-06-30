import { Contract } from '../entity/Contract'
import mysql from '../mysql'

class ContractService {
    async find(req) {
        const records = await mysql.getRepository(Contract).findBy(req)
        return { result: true, records: records }
    }
}

export default new ContractService()