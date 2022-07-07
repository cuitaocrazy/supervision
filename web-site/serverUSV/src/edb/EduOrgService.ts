import { EduOrg } from '../entity/EduOrg'
import mysql from '../mysql'
import { getUUIDWithEM } from '../Util'

class EduOrgService {
    async find(req: EduOrg) {
        const records = await mysql.getRepository(EduOrg).findBy({
            eduName: req.eduName
        })
        return { result: true, records: records }
    }

    async save(req: EduOrg) {
        const uuid = await getUUIDWithEM(mysql.manager)
        await mysql.getRepository(EduOrg).save({ ...req, eduId: uuid })
        return { result: true, msg: '插入成功' }
    }
}

export default new EduOrgService()