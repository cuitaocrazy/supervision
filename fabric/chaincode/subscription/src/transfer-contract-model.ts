/** 划拨合约模型 */
export class TransferContractModel {

    /** 划拨明细数组 */
    public transferDetails: TransferDetail[];

}
/** 划拨明细 */
export class TransferDetail {
    /** 划拨Id */
    public transferId: string;
    /** 考勤Id */
    public attendanceId: string;
    /** 划拨类型 */
    public transferType: string;
    /** 交易系统流水号 */
    public transactionId: string;
    /** 源账户 */
    public sourceAccount: string;
    /** 目标账户 */
    public targetAccount: string;
    /** 划拨金额 */
    public transferAmount: string;
    /** 划拨日期 */
    public transferDate: string;
    /** 划拨时间 */
    public transferTime: string;
    /** 划拨结果 */
    public transferResult: 'success';
    /** 划拨额外信息 */
    public transferExtraInfo: string;
}

/**
 * 划拨创建请求模型
 */
export class TransferCreateReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /** 划拨Id */
    public readonly transferId: string;
    /** 考勤Id */
    public readonly attendanceId: string;
    /** 划拨类型 */
    public readonly transferType: string;
    /** 交易系统流水号 */
    public readonly transactionId: string;
    /** 源账户 */
    public readonly sourceAccount: string;
    /** 目标账户 */
    public readonly targetAccount: string;
    /** 划拨金额 */
    public readonly transferAmount: string;
    /** 划拨日期 */
    public readonly transferDate: string;
    /** 划拨时间 */
    public readonly transferTime: string;
    /** 划拨结果 */
    public readonly transferResult: 'success';
    /** 划拨额外信息 */
    public readonly transferExtraInfo: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("transferId")) throw new Error("transferId is required");
        if (!transient.has("attendanceId")) throw new Error("attendanceId is required");
        if (!transient.has("transferType")) throw new Error("transferType is required");
        if (!transient.has("transactionId")) throw new Error("transactionId is required");
        if (!transient.has("sourceAccount")) throw new Error("sourceAccount is required");
        if (!transient.has("targetAccount")) throw new Error("targetAccount is required");
        if (!transient.has("transferAmount")) throw new Error("transferAmount is required");
        if (!transient.has("transferDate")) throw new Error("transferDate is required");
        if (!transient.has("transferTime")) throw new Error("transferTime is required");
        if (!transient.has("transferResult")) throw new Error("transferResult is required");

        if (!transient.has("transferExtraInfo")) throw new Error("transferExtraInfo is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.transferId = new TextDecoder().decode(transient.get('transferId'));
        this.attendanceId = new TextDecoder().decode(transient.get('attendanceId'));
        this.transferType = new TextDecoder().decode(transient.get('transferType'));
        this.transactionId = new TextDecoder().decode(transient.get('transactionId'));
        this.sourceAccount = new TextDecoder().decode(transient.get('sourceAccount'));
        this.targetAccount = new TextDecoder().decode(transient.get('targetAccount'));
        this.transferAmount = new TextDecoder().decode(transient.get('transferAmount'));
        // 用正则判断划拨金额必须是数字，否则抛出异常
        if (!/^[0-9]*$/.test(this.transferAmount)) throw new Error("transferAmount must be a number");
        this.transferDate = new TextDecoder().decode(transient.get('transferDate'));
        // 用正则判断划拨日期必须是yyyyMMdd，否则抛出异常
        if (!/^[0-9]{8}$/.test(this.transferDate)) throw new Error("transferDate must be a yyyyMMdd");
        // 用正则判断划拨时间必须时HHmmss，否则抛出异常
        if (!/^[0-9]{6}$/.test(this.transferTime)) throw new Error("transferTime must be a HHmmss");

        this.transferTime = new TextDecoder().decode(transient.get('transferTime'));
        const transferResult = new TextDecoder().decode(transient.get('transferResult'));
        // 划拨结果必须为成功，否则抛出异常
        if (transferResult !== 'success') throw new Error('transferResult must be success');
        this.transferResult = transferResult;
        this.transferExtraInfo = new TextDecoder().decode(transient.get('transferExtraInfo'));

    }
}
/**
 * 划拨创建响应模型
 */
export class TransferCreateResp {
    /**
     * 电子合同ID
     */
    public transferContractId: string;

    constructor(transferContractId: string) {
        this.transferContractId = transferContractId;
    }
}

/**
 * 划拨查询请求模型
 */
export class TransferQueryReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
    }
}
/**
 * 划拨明细查询请求模型
 */
export class TransferQueryDetailReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /** 划拨Id */
    public readonly transferId: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("transferId")) throw new Error("transferId is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.transferId = new TextDecoder().decode(transient.get('transferId'));
    }
}
/**
 * 划拨合约删除请求模型
 */
export class TransferDeleteReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
    }
}