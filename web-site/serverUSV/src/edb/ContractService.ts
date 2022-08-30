import { Contract } from '../entity/Contract'
import mysql from '../mysql'

class ContractService {
    


    async count() {
        const count =await mysql.getRepository(Contract).count();
        return count
    }

    async sum(){
        const result = {contractValid:0,contractFinish:0} ;
        const infos =await mysql.getRepository(Contract).createQueryBuilder("contract")
              .select("count(*) count,contract.contract_status status")
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