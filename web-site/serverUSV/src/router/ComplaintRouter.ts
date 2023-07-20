import { Router, Request, Response } from 'express';
import * as ComplaintService from '../service/ComplaintService'
import bodyParser = require('body-parser');
import { Complaint } from '../entity/Complaint';
export const complaintRouter = Router();
const jsonParser = bodyParser.json();


complaintRouter.post('/create', jsonParser, async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        console.log(`投诉：新增：${JSON.stringify(reqBody)}`)
        const result = await ComplaintService.create(reqBody)
        res.send(result)
    } catch (e) {
        console.error(`投诉：新增异常：${e}`)
        res.send({ result: false, msg: e.toString() })
    }
})

complaintRouter.get('/find', async (req: Request, res: Response) => {
    try {
        const reqQuery: any = req.query;
        console.log(`投诉：查询：${JSON.stringify(reqQuery)}`)
        const result = await ComplaintService.find(reqQuery)
        res.send(result)
    } catch (e) {
        console.error(`投诉：查询异常：${e}`)
        res.send({ result: false, msg: e.toString() })
    }
})
