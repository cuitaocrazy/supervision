import { Transaction } from '../entity/Transaction'
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'
import moment = require('moment')

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

    async query(req) {
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

        .where("transaction.contractId like :contractId  ", { contractId: nullableFuzzy(contractId) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: contracts[0],total:contracts[1] }
        // const records = await mysql.getRepository(Contract).findBy(req)
        // return { result: true, records: records }
    }

    async balanceQuery(req){
        let {tranDate,account} = req

        var where = (account?"transaction.eduSupervisedAccount = :account and " : "") + " tran_Date like :tranDate and transaction.tran_Type != 'cancel' "
        const amount =await mysql.getRepository(Transaction).createQueryBuilder("transaction")
              .select("SUM(transaction.transactionAmt) sum,edu_supervised_account account")
              .where(where ,{account:account,tranDate:nullableFuzzy(tranDate),number:account==null?1:2})
              .groupBy("transaction.eduSupervisedAccount")
              .getRawOne()
        console.log(amount)
        if(amount==null){
            return {result:true,records:[{sum:0,tranDate:tranDate,account:''}]}
        }
        return {result:true,records:[{sum:amount.sum,tranDate:tranDate,account:amount.account}]}
    // .getRawOne()
    }


    async sum(){
        const today  = moment().format("YYYYMMDD")
        const result = {result:true,buyCardNumber:0,buyCardAmt:0,refundNumber:0,refundAmt:0,transferNumber:0,transferAmt:0} 
        var where = " transaction.tran_Type != 'cancel' and tran_date = :today "
        const infos =await mysql.getRepository(Transaction).createQueryBuilder("transaction")
              .select("SUM(transaction.transactionAmt) sum,count(transaction.transactionAmt) count,transaction.tran_type tranType")
              .where(where ,{today:today})
              .groupBy("transaction.tranType")
              .getRawMany()
        if(infos==null){
            return result
        }
        infos.map(info=>{
            switch(info.tranType){
                case "buycard": {
                    result.buyCardAmt = info.sum/100
                    result.buyCardNumber = info.count
                    break;
                }
                case "refund": {
                    result.refundAmt = info.sum/100
                    result.refundNumber = info.count
                    break;
                }
                case "transfer": {
                    result.transferAmt = info.sum/100
                    result.transferNumber = info.count
                    break;
                }
            }
        })

        return result
    }
}
export default new TransactionService()