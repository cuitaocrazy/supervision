/**
 * 考勤合约模型
 */

export type AttendanceStatusType = "valid" | "invalid" | "negotiating";

export class AttendanceContractModel {
    /**
     * 考勤详情列表
     */
    public AttendanceDetails: AttendanceDetail[];

}

/**
 * 考勤详情模型
 */
export class AttendanceDetail {
    /**
     * 考勤ID
     */
    public attendanceId: string;
    /** 
     * 考勤日期
     */
    public attendanceDate: string;
    /**
     * 考勤时间 
     */
    public attendanceTime: string;
    /**
     * 考勤类型
     */
    public attendanceType: string;
    /**
     * 考勤状态
     */
    public attendanceStatus: AttendanceStatusType;
    /**
     * 考勤更新日期
     */
    public attendanceUpdateDate: string;
    /**
     * 考勤更新时间
     */
    public attendanceUpdateTime: string;
    /**
     * 考勤更新原因
     */
    public attendanceUpdateReason: string;
    /**
     * 考勤附加信息
     */
    public attendanceExtraInfo: string;
}

/**
 * 考勤创建请求模型
 */
export class AttendanceCreateReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /**
     * 考勤ID
     */
    public readonly attendanceId: string;
    /** 
     * 考勤日期
     */
    public readonly attendanceDate: string;
    /**
     * 考勤时间 
     */
    public readonly attendanceTime: string;
    /**
     * 考勤类型
     */
    public readonly attendanceType: string;
    /**
     * 考勤状态
     */
    public readonly attendanceStatus: AttendanceStatusType;
    /**
     * 考勤附加信息
     */
    public readonly attendanceExtraInfo: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("attendanceId")) throw new Error("attendanceId is required");
        if (!transient.has("attendanceDate")) throw new Error("attendanceDate is required");
        if (!transient.has("attendanceTime")) throw new Error("attendanceTime is required");
        if (!transient.has("attendanceType")) throw new Error("attendanceType is required");
        if (!transient.has("attendanceStatus")) throw new Error("attendanceStatus is required");
        if (!transient.has("attendanceExtraInfo")) throw new Error("attendanceExtraInfo is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.attendanceId = new TextDecoder().decode(transient.get('attendanceId'));
        this.attendanceDate = new TextDecoder().decode(transient.get('attendanceDate'));
        // 判断日期格式是否正确
        if (!/^\d{8}$/.test(this.attendanceDate)) throw new Error("attendanceDate format is incorrect");
        this.attendanceTime = new TextDecoder().decode(transient.get('attendanceTime'));
        // 判断时间格式是否正确
        if (!/^\d{6}$/.test(this.attendanceTime)) throw new Error("attendanceTime format is incorrect");
        this.attendanceType = new TextDecoder().decode(transient.get('attendanceType'));
        const as = new TextDecoder().decode(transient.get('attendanceStatus'));
        // 判断考勤状态值不合法时，抛出异常
        if (as !== "valid" && as !== "invalid" && as !== "negotiating") throw new Error("attendanceStatus must be valid, invalid or negotiating");
        this.attendanceStatus = as;
        this.attendanceExtraInfo = new TextDecoder().decode(transient.get('attendanceExtraInfo'));
    }
}
/**
 * 考勤更新请求模型
 */
export class AttendanceUpdateReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /**
     * 考勤Id
     */
    public readonly attendanceId: string;
    /**
     * 考勤状态
     */
    public readonly attendanceStatus: 'valid' | 'invalid' | 'negotiating';
    /**
     * 考勤更新日期
     */
    public readonly attendanceUpdateDate: string;
    /**
     * 考勤更新时间
     */
    public readonly attendanceUpdateTime: string;
    /**
     * 考勤更新原因
     */
    public readonly attendanceUpdateReason: string;
    /**
    * 考勤附加信息
    */
    public readonly attendanceExtraInfo: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("attendanceId")) throw new Error("attendanceId is required");
        if (!transient.has("attendanceStatus")) throw new Error("attendanceStatus is required");
        if (!transient.has("attendanceUpdateDate")) throw new Error("attendanceUpdateDate is required");
        if (!transient.has("attendanceUpdateTime")) throw new Error("attendanceUpdateTime is required");
        if (!transient.has("attendanceUpdateReason")) throw new Error("attendanceUpdateReason is required");
        if (!transient.has("attendanceExtraInfo")) throw new Error("attendanceExtraInfo is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.attendanceId = new TextDecoder().decode(transient.get('attendanceId'));
        const as = new TextDecoder().decode(transient.get('attendanceStatus'));
        // 判断考勤状态值不合法时，抛出异常
        if (as !== "valid" && as !== "invalid" && as !== "negotiating") throw new Error("attendanceStatus must be valid, invalid or negotiating");
        this.attendanceStatus = as;
        this.attendanceUpdateDate = new TextDecoder().decode(transient.get('attendanceUpdateDate'));
        // 判断日期格式是否正确
        if (!/^\d{8}$/.test(this.attendanceUpdateDate)) throw new Error("attendanceUpdateDate format is incorrect");
        this.attendanceUpdateTime = new TextDecoder().decode(transient.get('attendanceUpdateTime'));
        // 判断时间格式是否正确
        if (!/^\d{6}$/.test(this.attendanceUpdateTime)) throw new Error("attendanceUpdateTime format is incorrect");
        this.attendanceUpdateReason = new TextDecoder().decode(transient.get('attendanceUpdateReason'));
        this.attendanceExtraInfo = new TextDecoder().decode(transient.get('attendanceExtraInfo'));
    }
}
/**
 * 考勤查询请求模型
 */
export class AttendanceQueryReq {
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
 * 查询考勤明细请求模型
 */
export class AttendanceDetailQueryReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /**
     * 考勤Id
     */
    public readonly attendanceId: string;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("attendanceId")) throw new Error("attendanceId is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.attendanceId = new TextDecoder().decode(transient.get('attendanceId'));
    }
}
/**
 * 删除考勤请求模型
 */
export class AttendanceDeleteReq {
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
 * 协商考勤请求模型
 */
export class AttendanceChangeStatusReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /**
     * 考勤Id
     */
    public attendanceId: string;
    /**
     * 考勤状态
     */
    public attendanceStatus: AttendanceStatusType;

    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("attendanceId")) throw new Error("attendanceId is required");
        if (!transient.has("attendanceStatus")) throw new Error("attendanceStatus is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.attendanceId = new TextDecoder().decode(transient.get('attendanceId'));
        const as = new TextDecoder().decode(transient.get('attendanceStatus'));
        // 判断考勤状态值不合法时，抛出异常
        if (as !== "valid" && as !== "invalid" && as !== "negotiating") throw new Error("attendanceStatus must be valid, invalid or negotiating");
        this.attendanceStatus = as;
    }
}

/**
 * 有效考勤请求模型
 */
export class AttendanceValidReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /**
    * 考勤Id
    */
    public attendanceId: string;
    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("attendanceId")) throw new Error("attendanceId is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.attendanceId = new TextDecoder().decode(transient.get('attendanceId'));
    }
}

/**
 * 无效考勤请求模型
 */
export class AttendanceInvalidReq {
    /**
     * 电子合同ID
     */
    public readonly electronicContractId: string;
    /**
    * 考勤Id
    */
    public attendanceId: string;
    constructor(transient: Map<string, Uint8Array>) {
        if (!transient.has("electronicContractId")) throw new Error("electronicContractId is required");
        if (!transient.has("attendanceId")) throw new Error("attendanceId is required");

        this.electronicContractId = new TextDecoder().decode(transient.get('electronicContractId'));
        this.attendanceId = new TextDecoder().decode(transient.get('attendanceId'));
    }
}