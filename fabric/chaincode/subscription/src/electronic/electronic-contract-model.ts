/**
 * 电子合同实体
 */

export class ElectronicContractModel {
    /** 甲方 */
    public A: string
    /** 乙方*/
    public B: string
    /** 合同日期*/
    public ContractDate: string
    /** 合同时间*/
    public ContractTime: string
    /** 合同编号*/
    public ContractId: string
    /** 合同类型*/
    public ContractType: string
    /** 合同状态*/
    public ContractStatus: 'valid' | 'finished' | 'terminated'
    /** 合同更新日期*/
    public ContractUpdateDate: string
    /** 合同更新时间*/
    public ContractUpdateTime: string
    /** 合同更新原因*/
    public ContractUpdateReason: string
    /** 合同细节*/
    public ContractDetails: Array<string>

}