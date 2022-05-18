import { Context, Contract, Transaction } from "fabric-contract-api";
import { AttendanceContractModel, AttendanceCreateReq, AttendanceDetail } from "./attendance-contract-model";
import { ElectronicContract } from "./electronic/electronic-contract";
import { ElectronicContractModel } from "./electronic/electronic-contract-model";
import { checkContractExist } from "./util";

/**
 * 考勤合约
 */
export class AttendanceContract extends Contract {

    /**
    * 获取集合名称
    * @param svOrgID 监管机构ID
    * @param usvOrgID 被监管机构ID
    * @param bankID 银行ID
    */
    public getCollectionName(svOrgID: string, usvOrgID: string, bankID: string): string {
        return `${usvOrgID}-${bankID}-${svOrgID}`;
    }

    /**
     * 把电子合同Id转换为考勤合约Id
     */
    public getAttendanceContractId(electronicContractId: string): string {
        return electronicContractId.replace(/^ec/, "ac");
    }

    /**
     * 录入考勤
     */
    @Transaction()
    public async create(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<void> {
        const transient = ctx.stub.getTransient();
        const req = new AttendanceCreateReq(transient);
        // 获取考勤合约Id
        const acId = this.getAttendanceContractId(req.electronicContractId);
        // 获取集合名称
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        // 检查电子合同是否存在
        if (!await checkContractExist(ctx, collectionName, req.electronicContractId)) throw new Error("ElectronicContract not exists");
        // 检查电子合同状态是否为valid
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, req.electronicContractId)));
        if (model.ContractStatus !== "valid") throw new Error("ElectronicContractModel status is not valid");
        // 考勤合约存在时从链码中获取考勤合约，否则创建考勤合约
        const acModel = await this.getAttendanceContractOrNew(ctx, collectionName, acId, req);
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

    private async getAttendanceContractOrNew(ctx: Context, collectionName: string, acId: string, req: AttendanceCreateReq): Promise<AttendanceContractModel> {
        if (await checkContractExist(ctx, collectionName, acId)) {
            return JSON.parse(new TextDecoder().decode(await ctx.stub.getPrivateData(collectionName, acId))) as AttendanceContractModel;
        } else {
            const acModel = new AttendanceContractModel();
            acModel.electronicContractId = req.electronicContractId;
            return acModel
        }
    }
}