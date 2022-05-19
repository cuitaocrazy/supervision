import { Context, Contract, Transaction } from "fabric-contract-api";
import { AttendanceContractModel } from "./attendance-contract-model";
import { TransferContractModel, TransferCreateReq, TransferCreateResp, TransferDetail, TransferQueryDetailReq, TransferQueryReq } from "./transfer-contract-model";
import { checkContractExist, getAttendanceContractIdByElectronicContractId, getCollectionName, getContract, getOrCreateContract, getTransferContractIdByElectronicContractId } from "./util";

/**
 * 划拨合约
 */
export class TransferContract extends Contract {
    /**
     * 划拨合约创建
     */
    @Transaction()
    public async create(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<TransferCreateResp> {
        const transientMap = ctx.stub.getTransient();
        const req = new TransferCreateReq(transientMap);
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        const tcId = getTransferContractIdByElectronicContractId(req.electronicContractId);
        const tc = await getOrCreateContract(ctx, collectionName, tcId, () => new TransferContractModel())
        // 如果划拨明细数组不存在，则创建
        if (!tc.transferDetails) tc.transferDetails = []
        // 根据划拨Id查询划拨明细，如果划拨明细存在，则抛出异常
        if (tc.transferDetails.find(td => td.transferId == tcId)) {
            throw new Error(`TransferDetail already exists.`);
        }
        // 获取考勤合约Id
        const acId = getAttendanceContractIdByElectronicContractId(req.electronicContractId);
        // 考勤合约不存在时，抛出异常
        if (! await checkContractExist(ctx, collectionName, acId))
            throw new Error(`AttendanceContract does not exist.`);
        const ac = await getContract<AttendanceContractModel>(ctx, collectionName, acId);
        if (!ac.attendanceDetails) ac.attendanceDetails = [];
        // 获取考勤明细
        const ad = ac.attendanceDetails.find(ad => ad.attendanceId == req.attendanceId);
        if (!ad) throw new Error(`AttendanceDetail does not exist.`);
        // 考勤明细状态不是有效时，抛出异常
        if (ad.attendanceStatus !== "valid")
            throw new Error(`AttendanceDetail is not valid.`);
        // 如果划拨明细不存在，则创建
        const td = new TransferDetail();
        // 对划拨明细赋值
        td.transferId = tcId;
        td.attendanceId = req.attendanceId;
        td.transferType = req.transferType;
        td.transactionId = req.transactionId;
        td.sourceAccount = req.sourceAccount;
        td.targetAccount = req.targetAccount;
        td.transferAmount = req.transferAmount;
        td.transferDate = req.transferDate;
        td.transferTime = req.transferTime;
        td.transferResult = req.transferResult;
        td.transferExtraInfo = req.transferExtraInfo;
        // 将划拨明细添加到划拨合约中
        tc.transferDetails.push(td);
        // 将划拨合约写入到链码中
        await ctx.stub.putPrivateData(collectionName, tcId, new TextEncoder().encode(JSON.stringify(tc)));
        // 修改考勤状态为最终状态
        ad.attendanceStatus = "final";
        // 将考勤合约写入到链码中
        await ctx.stub.putPrivateData(collectionName, acId, new TextEncoder().encode(JSON.stringify(ac)));
        return new TransferCreateResp(tcId);
    }

    /** 查询划拨合约 */
    @Transaction(false)
    public async query(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<TransferContractModel> {
        const transientMap = ctx.stub.getTransient();
        const req = new TransferQueryReq(transientMap);
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        const tcId = getTransferContractIdByElectronicContractId(req.electronicContractId);
        // 划拨合约不存在时，抛出异常
        if (! await checkContractExist(ctx, collectionName, tcId)) throw new Error(`TransferContract does not exist.`);
        const tc = await getContract<TransferContractModel>(ctx, collectionName, tcId);
        return tc;
    }

    /** 查询划拨明细 */
    @Transaction(false)
    public async queryTransferDetail(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<TransferDetail> {
        const transientMap = ctx.stub.getTransient();
        const req = new TransferQueryDetailReq(transientMap);
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        const tcId = getTransferContractIdByElectronicContractId(req.electronicContractId);
        // 划拨合约不存在时，抛出异常
        if (! await checkContractExist(ctx, collectionName, tcId)) throw new Error(`TransferContract does not exist.`);
        const tc = await getContract<TransferContractModel>(ctx, collectionName, tcId);
        // 如果划拨明细数组不存在，则创建
        if (!tc.transferDetails) tc.transferDetails = [];
        // 根据划拨Id查询划拨明细，如果划拨明细不存在，则抛出异常
        const td = tc.transferDetails.find(td => td.transferId == req.transferId);
        if (!td) throw new Error(`TransferDetail does not exist.`);
        return td;
    }
}