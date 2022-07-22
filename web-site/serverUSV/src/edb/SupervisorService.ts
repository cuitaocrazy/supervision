import moment = require("moment");
import { SupervisorUser } from "../entity/SupervisorUser";
import { SupervisorOrg } from "../entity/SupervisorOrg";
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'
class SupervisorUserService {


    async findOneOrg(orgId){
        const result = await mysql.getRepository(SupervisorOrg).findOneBy(orgId
        )
        return result
    }



    async remove(supervisorUser:SupervisorUser){
        await mysql.getRepository(SupervisorUser).remove(supervisorUser)
        return  { result: true}
    }
    
    async find(reqParams) {
        let {page,size,supervisorUsername} = reqParams
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        reqParams.page=undefined
        reqParams.size=undefined    

        const supervisorUsers =await mysql.getRepository(SupervisorUser).createQueryBuilder("supervisorUser")

        .where("supervisorUser.supervisorUsername like :name ", { name: nullableFuzzy(supervisorUsername) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: supervisorUsers[0],total:supervisorUsers[1] }

    }

    


    async save(SupervisorUser: SupervisorUser) {
        await mysql.manager.save(SupervisorUser)
    }
    async saveSupervisorUser(supervisorUser:SupervisorUser){
        const result = await mysql.getRepository(SupervisorUser).save(supervisorUser)
        return result
    }

}
export default new SupervisorUserService()