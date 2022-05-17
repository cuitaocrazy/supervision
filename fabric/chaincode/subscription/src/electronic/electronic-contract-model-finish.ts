import { Object as FabricObject, Property } from 'fabric-contract-api';
/**
 * 电子合同-结束请求
 */
export class ElectronicContractModelFinishReq {
    /** 合同ID */
    public readonly ContractId: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("ContractId")) throw new Error("ContractId is required");
        this.ContractId = new TextDecoder().decode(transient.get("ContractId"));
    }
}

/**
 * 电子合同-结束响应
 */
@FabricObject()
export class ElectronicContractModelFinishResp {
    /** 合同ID */
    @Property()
    public readonly ContractId: string;

    constructor(contractId: string) {
        this.ContractId = contractId;
    }
}