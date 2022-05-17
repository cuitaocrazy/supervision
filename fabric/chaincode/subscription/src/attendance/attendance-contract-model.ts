/**
 * 考勤合约模型
 */
export class AttendanceContractModel {
    /**
     * 电子合同ID
     */
    public ElectronContractId: string;

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
    public AttendanceId: string;
    /** 
     * 考勤日期
     */
    public AttendanceDate: string;
    /**
     * 考勤时间 
     */
    public AttendanceTime: string;
    /**
     * 考勤类型
     */
    public AttendanceType: string;
    /**
     * 考勤状态
     */
    public AttendanceStatus: 'valid' | 'invalid' | 'negotiating';
    /**
     * 考勤更新日期
     */
    public AttendanceUpdateDate: string;
    /**
     * 考勤更新时间
     */
    public AttendanceUpdateTime: string;
    /**
     * 考勤更新原因
     */
    public AttendanceUpdateReason: string;

}