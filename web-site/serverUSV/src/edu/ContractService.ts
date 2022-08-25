import { Contract } from '../entity/Contract'
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'

class ContractService {
    async find(req) {
        let {page,size,contractId} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        req.page=undefined
        req.size=undefined    

        const eduLessons =await mysql.getRepository(Contract).createQueryBuilder("contract")

        .where("contract.contractId like :contractId ", { contractId: nullableFuzzy(contractId) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: eduLessons[0],total:eduLessons[1] }

        // const records = await mysql.getRepository(Contract).findBy(req)
        // return { result: true, records: records }
    }



    
}

export default new ContractService()