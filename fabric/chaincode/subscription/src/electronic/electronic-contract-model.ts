import { Object as FabricObject, Property } from 'fabric-contract-api';
/**
 * 电子合同实体
 */

@FabricObject()
export class ElectronicContractModel {
    /** 甲方 */
    @Property()
    public A: string
    /** 乙方*/
    @Property()
    public B: string
    /** 合同日期*/
    @Property()
    public ContractDate: string
    /** 合同时间*/
    @Property()
    public ContractTime: string
    /** 合同编号*/
    @Property()
    public ContractId: string
    /** 合同类型*/
    @Property()
    public ContractType: string
    /** 合同状态*/
    @Property()
    public ContractStatus: 'valid' | 'finished' | 'terminated'
    /** 合同更新日期*/
    @Property()
    public ContractUpdateDate: string
    /** 合同更新时间*/
    @Property()
    public ContractUpdateTime: string
    /** 合同更新原因*/
    @Property()
    public ContractUpdateReason: string
    /** 合同细节*/
    @Property()
    public ContractDetail: Array<string>
}