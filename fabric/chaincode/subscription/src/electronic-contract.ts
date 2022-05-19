import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import { ElectronicContractModel, ElectronicContractModelCreateReq, ElectronicContractModelCreateResp, ElectronicContractModelFinishReq, ElectronicContractModelFinishResp, ElectronicContractModelTerminateReq, ElectronicContractModelTerminateResp, ElectronicContractModelUpdateReq, ElectronicContractModelUpdateResp } from "./electronic-contract-model";
import { checkContractExist } from "./util";

/**
 * 电子合同
 */
@Info({ title: 'ElectronicContract', description: '电子合同' })
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

    /**
     * 创建电子合同
     * @param ctx 上下文
     * @param svOrgID 监管机构ID
     * @param usvOrgID 被监管机构ID
     * @param bankID 银行ID
     * @returns 
     */
    @Transaction()
    @Returns("ElectronicContractModelCreateResp")
    public async create(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModelCreateResp> {
        const transient = ctx.stub.getTransient();
        const req = new ElectronicContractModelCreateReq(transient);
        // 检查日期格式
        if (!/^\d{8}$/.test(req.contractDate)) throw new Error("contractDate format error, must be 8 digits");
        // 检查时间格式
        if (!/^\d{6}$/.test(req.contractTime)) throw new Error("contractTime format error, must be 6 digits");
        const contractID = await ctx.stub.createCompositeKey("ec", [req.a, req.b, req.contractDate, req.contractTime]);
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (await checkContractExist(ctx, collectionName, contractID)) throw new Error("Contract already exists");
        const model = new ElectronicContractModel();
        model.a = req.a;
        model.b = req.b;
        model.contractType = req.contractType;
        model.contractDate = req.contractDate;
        model.contractTime = req.contractTime;
        model.contractDetails = [req.contractDetail];
        model.ContractStatus = "valid";
        // // 存入私有集合
        await ctx.stub.putPrivateData(collectionName, contractID, new TextEncoder().encode(JSON.stringify(model)));
        return new ElectronicContractModelCreateResp(contractID);
    }

    /**
     * 更新电子合同
     * @param ctx 上下文
     * @param svOrgID 监管机构ID
     * @param usvOrgID 被监管机构ID
     * @param bankID 银行ID
     * @returns 
     */
    @Transaction()
    @Returns("ElectronicContractModelUpdateResp")
    public async update(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModelUpdateResp> {
        const transient = ctx.stub.getTransient();
        const req = new ElectronicContractModelUpdateReq(transient);
        // 检查更新日期格式
        if (!/^\d{8}$/.test(req.contractUpdateDate)) throw new Error("contractUpdateDate format error, must be 8 digits");
        // 检查更新时间格式
        if (!/^\d{6}$/.test(req.contractUpdateTime)) throw new Error("contractUpdateTime format error, must be 6 digits");
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (!await checkContractExist(ctx, collectionName, req.contractId)) throw new Error("Contract not exists");
        const buffer = await ctx.stub.getPrivateData(collectionName, req.contractId);
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(buffer));
        // 合约状态非有效状态时不允许更新
        if (model.ContractStatus != "valid") throw new Error("Contract status is not valid");
        model.contractUpdateDate = req.contractUpdateDate;
        model.contractUpdateTime = req.contractUpdateTime;
        model.contractUpdateReason = req.contractUpdateReason;
        model.contractDetails.push(req.contractDetail);
        // 保存合约
        await ctx.stub.putPrivateData(collectionName, req.contractId, new TextEncoder().encode(JSON.stringify(model)));
        return new ElectronicContractModelUpdateResp(req.contractId);
    }

    /**
     * 完成电子合同
     * @param ctx 上下文
     * @param svOrgID 监管机构ID
     * @param usvOrgID 被监管机构ID
     * @param bankID 银行ID
     * @returns
     */
    @Transaction()
    @Returns("ElectronicContractModelFinishResp")
    public async finish(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModelFinishResp> {
        const transient = ctx.stub.getTransient();
        const req = new ElectronicContractModelFinishReq(transient);
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (!await checkContractExist(ctx, collectionName, req.contractId)) throw new Error("Contract not exists");
        const buffer = await ctx.stub.getPrivateData(collectionName, req.contractId);
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(buffer));
        // 合约状态非有效状态时不允许更新
        if (model.ContractStatus != "valid") throw new Error("Contract status is not valid");
        model.ContractStatus = "finished";
        // 保存合约
        await ctx.stub.putPrivateData(collectionName, req.contractId, new TextEncoder().encode(JSON.stringify(model)));
        return new ElectronicContractModelFinishResp(req.contractId);
    }

    /**
     * 终止电子合同
     */
    @Transaction()
    @Returns("ElectronicContractModelTerminateResp")
    public async terminate(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModelTerminateResp> {
        const transient = ctx.stub.getTransient();
        const req = new ElectronicContractModelTerminateReq(transient);
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (!await checkContractExist(ctx, collectionName, req.contractId)) throw new Error("Contract not exists");
        const buffer = await ctx.stub.getPrivateData(collectionName, req.contractId);
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(buffer));
        // 合约状态非有效状态时不允许更新
        if (model.ContractStatus != "valid") throw new Error("Contract status is not valid");
        model.ContractStatus = "terminated";
        // 保存合约
        await ctx.stub.putPrivateData(collectionName, req.contractId, new TextEncoder().encode(JSON.stringify(model)));
        return new ElectronicContractModelTerminateResp(req.contractId);
    }

    /**
     * 查询电子合同
     */
    @Transaction(false)
    @Returns("ElectronicContractModel")
    public async query(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModel> {
        const transient = ctx.stub.getTransient();
        if (!transient.has("contractId")) throw new Error("contractId is required");
        const contractId = new TextDecoder().decode(transient.get("contractId"));
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (!await checkContractExist(ctx, collectionName, contractId)) throw new Error("Contract not exists");
        const buffer = await ctx.stub.getPrivateData(collectionName, contractId);
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(buffer));
        return model;
    }

    /**
     * 删除电子合同
     */
    @Transaction()
    @Returns("ElectronicContractModel")
    public async delete(ctx: Context, svOrgID: string, usvOrgID: string, bankID: string): Promise<ElectronicContractModel> {
        const transient = ctx.stub.getTransient();
        if (!transient.has("contractId")) throw new Error("contractId is required");
        const contractId = new TextDecoder().decode(transient.get("contractId"));
        const collectionName = this.getCollectionName(svOrgID, usvOrgID, bankID);
        if (!await checkContractExist(ctx, collectionName, contractId)) throw new Error("Contract not exists");
        const buffer = await ctx.stub.getPrivateData(collectionName, contractId);
        const model: ElectronicContractModel = JSON.parse(new TextDecoder().decode(buffer));
        // 合同状态必须是完成或终止状态才能删除
        if (model.ContractStatus != "finished" && model.ContractStatus != "terminated") throw new Error("Contract status is not finished or terminated");
        // 删除合约
        await ctx.stub.deletePrivateData(collectionName, contractId);
        return model;
    }
}