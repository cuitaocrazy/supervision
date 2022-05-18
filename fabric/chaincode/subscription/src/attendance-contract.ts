import { Context, Contract, Transaction } from "fabric-contract-api";
import { AttendanceContractModel, AttendanceCreateReq, AttendanceDeleteReq, AttendanceDetail, AttendanceDetailQueryReq, AttendanceChangeStatusReq as AttendanceNegotiateReq, AttendanceQueryReq, AttendanceUpdateReq } from "./attendance-contract-model";
import { ElectronicContractModel } from "./electronic-contract-model";
import { checkContractExist, getAttendanceContractId as getAttendanceContractIdByElectronicContractId, getCollectionName } from "./util";

/**
 * 考勤合约
 */
export class AttendanceContract extends Contract {




    /**
     * 录入考勤
     */
    @Transaction()
    public async create(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<void> {
        const transient = ctx.stub.getTransient();
        const req = new AttendanceCreateReq(transient);
        // 获取考勤合约Id
        const acId = getAttendanceContractIdByElectronicContractId(req.electronicContractId);
        // 获取集合名称
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        // 检查电子合同是否存在
        if (!await checkContractExist(ctx, collectionName, req.electronicContractId)) throw new Error("ElectronicContract not exists");
        // 检查电子合同状态是否为valid
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, req.electronicContractId)));
        if (model.ContractStatus !== "valid") throw new Error("ElectronicContractModel status is not valid");
        // 考勤合约存在时从链码中获取考勤合约，否则创建考勤合约
        const acModel = await this.getAttendanceContractOrNew(ctx, collectionName, acId);
        // 从考勤明细中判断是否已经录入过，通过考勤id
        if (acModel.AttendanceDetails.find(x => x.attendanceId === req.attendanceId)) throw new Error("attendanceId already exists");
        // 新建考勤明细
        const ad = new AttendanceDetail();
        ad.attendanceId = req.attendanceId;
        ad.attendanceDate = req.attendanceDate;
        ad.attendanceTime = req.attendanceTime;
        ad.attendanceType = req.attendanceType;
        ad.attendanceStatus = req.attendanceStatus;
        ad.attendanceExtraInfo = req.attendanceExtraInfo;
        if (!acModel.AttendanceDetails) acModel.AttendanceDetails = [];
        acModel.AttendanceDetails.push(ad);
        // 更新考勤合约
        await ctx.stub.putPrivateData(collectionName, acId, new TextEncoder().encode(JSON.stringify(acModel)));
    }

    /** 
     * 更新考勤 
    */
    @Transaction()
    public async update(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<void> {
        const transient = ctx.stub.getTransient();
        const req = new AttendanceUpdateReq(transient);
        // 获取集合名称
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        // 获取考勤合约Id
        const acId = getAttendanceContractIdByElectronicContractId(req.electronicContractId);
        // 检查电子合同是否存在
        if (!await checkContractExist(ctx, collectionName, req.electronicContractId)) throw new Error("ElectronicContract not exists");
        // 检查电子合同状态是否为valid
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, req.electronicContractId)));
        if (model.ContractStatus !== "valid") throw new Error("ElectronicContractModel status is not valid");
        // 考勤合约不存在，抛出异常
        if (!await checkContractExist(ctx, collectionName, acId)) throw new Error("AttendanceContract not exists");
        // 获取考勤合约
        const acModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, acId))) as AttendanceContractModel;
        // 获取考勤明细
        const ad = acModel.AttendanceDetails.find(x => x.attendanceId === req.attendanceId);
        if (!ad) throw new Error("AttendanceDetail not exists");
        // 更新考勤明细
        ad.attendanceStatus = req.attendanceStatus;
        ad.attendanceUpdateDate = req.attendanceUpdateDate;
        ad.attendanceUpdateTime = req.attendanceUpdateTime;
        ad.attendanceUpdateReason = req.attendanceUpdateReason;
        ad.attendanceExtraInfo = req.attendanceExtraInfo;
        // 更新考勤合约
        await ctx.stub.putPrivateData(collectionName, acId, new TextEncoder().encode(JSON.stringify(acModel)));
    }

    /**
     * 查询考勤合约
     */
    @Transaction(false)
    public async query(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<AttendanceContractModel> {
        // 获取集合名称
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        // 获取考勤合约Id
        const transient = ctx.stub.getTransient();
        const req = new AttendanceQueryReq(transient);
        const acId = getAttendanceContractIdByElectronicContractId(req.electronicContractId);
        // 考勤合约不存在，抛出异常
        if (!await checkContractExist(ctx, collectionName, acId)) throw new Error("AttendanceContract not exists");
        // 获取考勤合约
        const acModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, acId))) as AttendanceContractModel;
        return acModel;
    }
    /** 查询考勤明细 */
    public async queryDetail(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<AttendanceDetail> {
        // 获取集合名称
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        // 获取考勤合约Id
        const transient = ctx.stub.getTransient();
        const req = new AttendanceDetailQueryReq(transient);
        const acId = getAttendanceContractIdByElectronicContractId(req.electronicContractId);
        // 考勤合约不存在，抛出异常
        if (!await checkContractExist(ctx, collectionName, acId)) throw new Error("AttendanceContract not exists");
        // 获取考勤合约
        const acModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, acId))) as AttendanceContractModel;
        // 获取考勤明细
        const ad = acModel.AttendanceDetails.find(x => x.attendanceId === req.attendanceId);
        if (!ad) throw new Error("AttendanceDetail not exists");
        return ad;
    }

    /** 删除考勤 */
    @Transaction()
    public async delete(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<AttendanceContractModel> {
        const transient = ctx.stub.getTransient();
        const req = new AttendanceDeleteReq(transient);
        // 获取集合名称
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        // 获取考勤合约Id
        const acId = getAttendanceContractIdByElectronicContractId(req.electronicContractId);
        // 检查电子合同是否存在
        if (!await checkContractExist(ctx, collectionName, req.electronicContractId)) throw new Error("ElectronicContract not exists");
        // 检查电子合同状态是否为valid
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, req.electronicContractId)));
        if (model.ContractStatus !== "valid") throw new Error("ElectronicContractModel status is not valid");
        // 考勤合约不存在，抛出异常
        if (!await checkContractExist(ctx, collectionName, acId)) throw new Error("AttendanceContract not exists");
        // 获取考勤合约
        const acModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, acId))) as AttendanceContractModel;
        // 删除考勤合约
        await ctx.stub.deletePrivateData(collectionName, acId);
        return acModel;
    }

    /** 协商考勤 */
    @Transaction()
    public async changeDetailStatus(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<void> {
        const transient = ctx.stub.getTransient();
        const req = new AttendanceNegotiateReq(transient);
        // 获取集合名称
        const collectionName = getCollectionName(svOrgID, usvOrgID, bankID);
        // 获取考勤合约Id
        const acId = getAttendanceContractIdByElectronicContractId(req.electronicContractId);
        // 检查电子合同是否存在
        if (!await checkContractExist(ctx, collectionName, req.electronicContractId))
            throw new Error("ElectronicContract not exists");
        // 检查电子合同状态是否为valid
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, req.electronicContractId)));
        if (model.ContractStatus !== "valid")
            throw new Error("ElectronicContractModel status is not valid");
        // 考勤合约不存在，抛出异常
        if (!await checkContractExist(ctx, collectionName, acId))
            throw new Error("AttendanceContract not exists");
        // 获取考勤合约
        const acModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, acId))) as AttendanceContractModel;
        // 查询考勤明细
        const ad = acModel.AttendanceDetails.find(x => x.attendanceId === req.attendanceId);
        // 考勤明细不存在抛出异常
        if (!ad)
            throw new Error("AttendanceDetail not exists");
        ad.attendanceStatus = req.attendanceStatus;
        await ctx.stub.putPrivateData(collectionName, acId, new TextEncoder().encode(JSON.stringify(acModel)));
    }

    /**
     * 获取考勤合约或者创建考勤合约
     * @param ctx 上下文
     * @param collectionName 集合名称
     * @param acId 考勤合约Id
     * @returns 
     */
    private async getAttendanceContractOrNew(ctx: Context, collectionName: string, acId: string): Promise<AttendanceContractModel> {
        if (await checkContractExist(ctx, collectionName, acId)) {
            return JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, acId))) as AttendanceContractModel;
        } else {
            const acModel = new AttendanceContractModel();
            return acModel
        }
    }
}