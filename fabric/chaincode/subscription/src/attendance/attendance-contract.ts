import { Contract } from "fabric-contract-api";

/**
 * 考勤合约
 */
export class AttendanceContract extends Contract {

    /**
    * 获取集合名称
    * @param svOrgID 监管机构ID
    * @param usvOrgID 被监管机构ID
    * @param bankID 银行ID
    */
    public getCollectionName(svOrgID: string, usvOrgID: string, bankID: string): string {
        return `${usvOrgID}-${bankID}-${svOrgID}`;
    }
}