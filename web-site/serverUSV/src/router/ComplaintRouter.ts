import { Router, Request, Response } from 'express';
import * as ComplaintService from '../service/ComplaintService'
export const complaintRouter = Router();

complaintRouter.post('/create', async (req: Request, res: Response) => {
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