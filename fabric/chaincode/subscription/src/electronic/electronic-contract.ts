import { Context, Contract, Transaction } from "fabric-contract-api";
import { ElectronicContractModel } from "./electronic-contract-model";
import { ElectronicContractModelCreateReq, ElectronicContractModelCreateResp } from "./electronic-contract-model-create";
import { ElectronicContractModelUpdateReq, ElectronicContractModelUpdateResp } from "./electronic-contract-model-update";

/**
 * 电子合同
 */
export class ElectronicContract extends Contract {

    /** 
     * 获取集合名称
     * @param svOrgID 监管机构ID
     * @param usvOrgID 被监管机构ID
     * @param bankID 银行ID
     */
    public getCollectionName(svOrgID: string, usvOrgID: string, bankID: string): string {
        return `${usvOrgID}-${bankID}-${svOrgID}`;
    }

    @Transaction()
    public async create(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModelCreateResp> {
        const transient = ctx.stub.getTransient();
        const req = new ElectronicContractModelCreateReq(transient);
        // 检查日期格式
        if (!/^\d{8}$/.test(req.ContractDate)) throw new Error("ContractDate format error, must be 8 digits");
        // 检查时间格式
        if (!/^\d{6}$/.test(req.ContractTime)) throw new Error("ContractTime format error, must be 6 digits");
        const contractID = await ctx.stub.createCompositeKey("ec", [req.A, req.B, req.ContractDate, req.ContractTime]);
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (await this.checkContractExist(ctx, collectionName, contractID)) throw new Error("Contract already exists");
        const model = new ElectronicContractModel();
        model.A = req.A;
        model.B = req.B;
        model.ContractType = req.ContractType;
        model.ContractDate = req.ContractDate;
        model.ContractTime = req.ContractTime;
        model.ContractDetail = [req.ContractDetail];
        model.ContractStatus = "valid";
        // 存入私有集合
        await ctx.stub.putPrivateData(collectionName, contractID, new TextEncoder().encode(JSON.stringify(model)));
        return new ElectronicContractModelCreateResp(contractID);
    }

    @Transaction()
    public async update(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModelUpdateResp> {
        const transient = ctx.stub.getTransient();
        const req = new ElectronicContractModelUpdateReq(transient);
        // 检查更新日期格式
        if (!/^\d{8}$/.test(req.ContractUpdateDate)) throw new Error("ContractUpdateDate format error, must be 8 digits");
        // 检查更新时间格式
        if (!/^\d{6}$/.test(req.ContractUpdateTime)) throw new Error("ContractUpdateTime format error, must be 6 digits");
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (!await this.checkContractExist(ctx, collectionName, req.ContractId)) throw new Error("Contract not exists");
        const buffer = await ctx.stub.getPrivateData(collectionName, req.ContractId);
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(buffer));
        // 合约状态非有效状态时不允许更新
        if (model.ContractStatus != "valid") throw new Error("Contract status is not valid");
        model.ContractUpdateDate = req.ContractUpdateDate;
        model.ContractUpdateTime = req.ContractUpdateTime;
        model.ContractUpdateReason = req.ContractUpdateReason;
        model.ContractDetail.push(req.ContractDetail);
        // 保存合约
        await ctx.stub.putPrivateData(collectionName, req.ContractId, new TextEncoder().encode(JSON.stringify(model)));
        return new ElectronicContractModelUpdateResp(req.ContractId);
    }

    /** 
     * 检查合约是否存在
     * @param ctx 上下文
     * @param contractID 合约ID
     */
    public async checkContractExist(ctx: Context, collectionName: string, contractID: string): Promise<boolean> {
        const buffer = await ctx.stub.getPrivateDataHash(collectionName, contractID);
        return buffer != null && buffer.length > 0;
    }
}