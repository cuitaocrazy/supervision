/** 划拨合约模型 */
export class TransferContractModel {

}
/** 划拨明细 */
export class TransferDetailModel {
    /** 划拨Id */
    public transferId: string;
    /** 考勤Id */
    public attendanceId: string;
    /** 划拨类型 */
    public transferType: string;
    /** 交易流水号 */
    public tranLsId: string;
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
    public transferResult: 'success' | 'failure';
    /** 划拨失败原因 */
    public transferFailureReason: string;

}