import { Object as FabricObject, Property } from 'fabric-contract-api';
/**
 * 电子合同实体--创建请求
 */
@FabricObject()
export class ElectronicContractModelCreate {
    /** 甲方 */
    @Property()
    public A: string
    /** 乙方*/
    @Property()
    public B: string
    /** 合同类型*/
    @Property()
    public ContractType: string
    /** 合同细节*/
    @Property()
    public ContractDetail: object
}