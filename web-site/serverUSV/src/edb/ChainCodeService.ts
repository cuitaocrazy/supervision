import { ChainCode } from '../entity/ChainCode'

import mysql from '../mysql'

const nullableFuzzy = (query:any)=>{
    return '%'.concat(query?query:'').concat('%')
}
class ChainCodeService {

    /**
     * 查询链码信息
     * @param req 
     * @returns 
     */
    async find() {
        const chainCodes = await mysql.getRepository(ChainCode).find()
        return { result: true, msg: '查询成功', records: chainCodes }
    }




}

export default new ChainCodeService()