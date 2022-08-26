
import { EduOrg } from '../entity/EduOrg'
import mysql from '../mysql'
class EduService {

    
    async findByLoginName(loginName) {
        const result = await mysql.getRepository(EduOrg).findOneBy({
            eduLoginName: loginName
        })
        return result

    }



}
export default new EduService()