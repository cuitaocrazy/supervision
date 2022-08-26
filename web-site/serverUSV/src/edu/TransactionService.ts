import { Transaction } from '../entity/Transaction'
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'

class TransactionService {

    async refundQuery(req) {
        let {page,size,contractId} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        req.page=undefined
        req.size=undefined    

        const contracts =await mysql.getRepository(Transaction).createQueryBuilder("transaction")

        .where("transaction.contractId like :contractId and transaction.tranType = 'refund' ", { contractId: nullableFuzzy(contractId) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: contracts[0],total:contracts[1] }
        // const records = await mysql.getRepository(Contract).findBy(req)
        // return { result: true, records: records }
    }

    async query(req,account) {
        let {page,size,contractId} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        req.page=undefined
        req.size=undefined    

        const transaction =await mysql.getRepository(Transaction).createQueryBuilder("transaction")

        .where("transaction.eduSupervisedAccount = :account and transaction.contractId like :contractId  ", { contractId: nullableFuzzy(contractId),account:account })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()

        const balance = (await this.balanceQuery(account))

        return { result: true, records: transaction[0],total:transaction[1],balance:balance/100 }
        // const records = await mysql.getRepository(Contract).findBy(req)
        // return { result: true, records: records }
    }

    async balanceQuery(account){

        var where = (account?"transaction.eduSupervisedAccount = :account and " : "") +" transaction.tran_Type != 'cancel' "
        const amount =await mysql.getRepository(Transaction).createQueryBuilder("transaction")
              .select("SUM(transaction.transactionAmt) sum")
              .where(where ,{account:account})
              .getRawOne()
        console.log(amount)
        if(amount==null){
            return 0
        }
        return amount.sum
    // .getRawOne()
    }
}
export default new TransactionService()