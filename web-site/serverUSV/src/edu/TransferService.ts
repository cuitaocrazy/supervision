import { Transfer } from '../entity/Transfer'
import mysql from '../mysql'
import {nullableFuzzy} from '../Util'

class TransferService {
    async find(req) {
        let {page,size,lessonName,consumerName} = req
        if(page==null){
            page=0
        }
        if(size==null){
            size=20
        }
        req.page=undefined
        req.size=undefined   
        
        const records =await mysql.getRepository(Transfer).createQueryBuilder("transfer")

        .where("transfer.lessonName like :lessonName and transfer.consumerName like :consumerName ", { lessonName: nullableFuzzy(lessonName),consumerName:nullableFuzzy(consumerName) })
        // .skip(page*size)
        //todo 方便测试
        .skip(0)
        .take(size).getManyAndCount()
        return { result: true, records: records[0],total:records[1] }

        // const records = await mysql.getRepository(Transfer).findBy(req)
        // return { result: true, records: records }
    }
}

export default new TransferService()