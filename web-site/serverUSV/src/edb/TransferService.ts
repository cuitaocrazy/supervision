import { Transfer } from '../entity/Transfer'
import mysql from '../mysql'

class TransferService {
    async count(){
        const count =await mysql.getRepository(Transfer).count();
        return count
    }
}

export default new TransferService()