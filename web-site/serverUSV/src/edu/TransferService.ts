import { Transfer } from '../entity/Transfer'
import mysql from '../mysql'

class TransferService {
    async find(req) {
        const records = await mysql.getRepository(Transfer).findBy(req)
        return { result: true, records: records }
    }
}

export default new TransferService()