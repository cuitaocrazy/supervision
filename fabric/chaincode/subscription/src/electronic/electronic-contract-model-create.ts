import { Object as FabricObject, Property } from 'fabric-contract-api';
/**
 * 电子合同实体--创建请求
 */
export class ElectronicContractModelCreateReq {
    /** 甲方 */
    public readonly A: string
    /** 乙方*/
    public readonly B: string
    /** 合同类型*/
    public readonly ContractType: string
    /** 合同日期 */
    public readonly ContractDate: string
    /** 合同时间 */
    public readonly ContractTime: string
    /** 合同细节*/
    public readonly ContractDetail: string

    /**
     * 创建电子合同实体
     * @param transient 前端上送的数据
     */
    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("A")) throw new Error("A is required");
        if (!transient.has("B")) throw new Error("B is required");
        if (!transient.has("ContractType")) throw new Error("ContractType is required");
        if (!transient.has("ContractDetail")) throw new Error("ContractDetail is required");
        if (!transient.has("ContractDate")) throw new Error("ContractDate is required");
        if (!transient.has("ContractTime")) throw new Error("ContractTime is required");

        this.A = new TextDecoder().decode(transient.get("A"));
        this.B = new TextDecoder().decode(transient.get("B"));
        this.ContractType = new TextDecoder().decode(transient.get("ContractType"));
        this.ContractDate = new TextDecoder().decode(transient.get("ContractDate"));
        this.ContractTime = new TextDecoder().decode(transient.get("ContractTime"));
        this.ContractDetail = new TextDecoder().decode(transient.get("ContractDetail"));
    }
}
/**
 * 电子合同实体--创建响应
 */
@FabricObject()
export class ElectronicContractModelCreateResp {
    /** 合同ID */
    @Property()
    public readonly ContractId: string

    constructor(contractId: string) {
        this.ContractId = contractId;
    }
}