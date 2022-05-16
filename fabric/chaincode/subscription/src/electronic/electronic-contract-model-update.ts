import { Object as FabricObject, Property } from 'fabric-contract-api';
/**
 * 电子合同实体--更新请求
 */
export class ElectronicContractModelUpdateReq {
    /** 合同编号*/
    public ContractId: string
    /** 合同更新原因*/
    public ContractUpdateReason: string
    /** 合同更新日期 */
    public ContractUpdateDate: string
    /** 合同更新时间 */
    public ContractUpdateTime: string
    /** 合同细节*/
    public ContractDetail: string

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has('ContractId')) throw new Error('ContractId is required');
        if (!transient.has('ContractUpdateReason')) throw new Error('ContractUpdateReason is required');
        if (!transient.has('ContractUpdateDate')) throw new Error('ContractUpdateDate is required');
        if (!transient.has('ContractUpdateTime')) throw new Error('ContractUpdateTime is required');
        if (!transient.has('ContractDetail')) throw new Error('ContractDetail is required');
        this.ContractId = new TextDecoder().decode(transient.get('ContractId'));
        this.ContractUpdateReason = new TextDecoder().decode(transient.get('ContractUpdateReason'));
        this.ContractUpdateDate = new TextDecoder().decode(transient.get('ContractUpdateDate'));
        this.ContractUpdateTime = new TextDecoder().decode(transient.get('ContractUpdateTime'));
        this.ContractDetail = new TextDecoder().decode(transient.get('ContractDetail'));
    }
}

/**
 * 电子合同实体--更新响应
 */
@FabricObject()
export class ElectronicContractModelUpdateResp {
    /** 合同ID */
    @Property()
    public readonly ContractID: string

    constructor(contractID: string) {
        this.ContractID = contractID;
    }
}