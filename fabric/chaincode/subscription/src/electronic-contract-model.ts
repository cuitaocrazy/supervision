/**
 * 电子合同实体
 */

export class ElectronicContractModel {
    /** 甲方 */
    public a: string
    /** 乙方*/
    public b: string
    /** 合同日期*/
    public contractDate: string
    /** 合同时间*/
    public contractTime: string
    /** 合同编号*/
    public contractId: string
    /** 合同类型*/
    public contractType: string
    /** 合同状态*/
    public ContractStatus: 'valid' | 'finished' | 'terminated'
    /** 合同更新日期*/
    public contractUpdateDate: string
    /** 合同更新时间*/
    public contractUpdateTime: string
    /** 合同更新原因*/
    public contractUpdateReason: string
    /** 合同细节*/
    public contractDetails: Array<string>

}

export class ElectronicContractModelCreateReq {
    /** 甲方 */
    public readonly a: string
    /** 乙方*/
    public readonly b: string
    /** 合同类型*/
    public readonly contractType: string
    /** 合同日期 */
    public readonly contractDate: string
    /** 合同时间 */
    public readonly contractTime: string
    /** 合同细节*/
    public readonly contractDetail: string

    /**
     * 创建电子合同实体
     * @param transient 前端上送的数据
     */
    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("a")) throw new Error("a is required");
        if (!transient.has("b")) throw new Error("b is required");
        if (!transient.has("contractType")) throw new Error("contractType is required");
        if (!transient.has("contractDetail")) throw new Error("contractDetail is required");
        if (!transient.has("contractDate")) throw new Error("contractDate is required");
        if (!transient.has("contractTime")) throw new Error("contractTime is required");

        this.a = new TextDecoder().decode(transient.get("a"));
        this.b = new TextDecoder().decode(transient.get("b"));
        this.contractType = new TextDecoder().decode(transient.get("contractType"));
        this.contractDate = new TextDecoder().decode(transient.get("contractDate"));
        this.contractTime = new TextDecoder().decode(transient.get("contractTime"));
        this.contractDetail = new TextDecoder().decode(transient.get("contractDetail"));
    }
}
/**
 * 电子合同实体--创建响应
 */
export class ElectronicContractModelCreateResp {
    /** 合同ID */
    public readonly contractId: string

    constructor(contractId: string) {
        this.contractId = contractId;
    }
}

/**
 * 电子合同-结束请求
 */
export class ElectronicContractModelFinishReq {
    /** 合同ID */
    public readonly contractId: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("contractId")) throw new Error("contractId is required");
        this.contractId = new TextDecoder().decode(transient.get("contractId"));
    }
}

/**
 * 电子合同-结束响应
 */
export class ElectronicContractModelFinishResp {
    /** 合同ID */
    public readonly contractId: string;

    constructor(contractId: string) {
        this.contractId = contractId;
    }
}
/**
 * 电子合同--终止请求
 */
export class ElectronicContractModelTerminateReq {
    /** 合同ID */
    public readonly contractId: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("contractId")) throw new Error("contractId is required");
        this.contractId = new TextDecoder().decode(transient.get("contractId"));
    }
}
/**
 * 电子合同--终止响应
 */
export class ElectronicContractModelTerminateResp {
    /** 合同ID */
    public readonly contractId: string;

    constructor(contractId: string) {
        this.contractId = contractId;
    }
}
/**
 * 电子合同实体--更新请求
 */
export class ElectronicContractModelUpdateReq {
    /** 合同编号*/
    public contractId: string
    /** 合同更新原因*/
    public contractUpdateReason: string
    /** 合同更新日期 */
    public contractUpdateDate: string
    /** 合同更新时间 */
    public contractUpdateTime: string
    /** 合同细节*/
    public contractDetail: string

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has('contractId')) throw new Error('contractId is required');
        if (!transient.has('contractUpdateReason')) throw new Error('contractUpdateReason is required');
        if (!transient.has('contractUpdateDate')) throw new Error('contractUpdateDate is required');
        if (!transient.has('contractUpdateTime')) throw new Error('contractUpdateTime is required');
        if (!transient.has('contractDetail')) throw new Error('contractDetail is required');
        this.contractId = new TextDecoder().decode(transient.get('contractId'));
        this.contractUpdateReason = new TextDecoder().decode(transient.get('contractUpdateReason'));
        this.contractUpdateDate = new TextDecoder().decode(transient.get('contractUpdateDate'));
        this.contractUpdateTime = new TextDecoder().decode(transient.get('contractUpdateTime'));
        this.contractDetail = new TextDecoder().decode(transient.get('contractDetail'));
    }
}

/**
 * 电子合同实体--更新响应
 */
export class ElectronicContractModelUpdateResp {
    /** 合同ID */
    public readonly contractId: string

    constructor(contractId: string) {
        this.contractId = contractId;
    }
}