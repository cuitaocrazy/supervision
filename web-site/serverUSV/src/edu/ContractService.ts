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


    async sum(eduId){
        const result = {contractValid:0,contractFinish:0} ;
        var where = " contract.edu_id != 'eduId' "
        const infos =await mysql.getRepository(Contract).createQueryBuilder("contract")
              .select("count(*) count,contract.contract_status status")
              .where(where ,{eduId:eduId})
              .groupBy("contract.contract_status")
              .getRawMany()
        if(infos==null){
            return result
        }
        infos.map(info=>{
            switch(info.status){
                case "valid": {
                    result.contractValid = info.count
                    break;
                }
                case "finished": {
                    result.contractFinish += info.finished
                    break;
                }
                case "terminnated": {
                    result.contractFinish += info.finished
                    break;
                }
            }
        })

        return result
    }

    
}

export default new ContractService()