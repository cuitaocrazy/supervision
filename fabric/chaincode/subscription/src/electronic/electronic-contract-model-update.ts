import { Object as FabricObject, Property } from 'fabric-contract-api';
/**
 * 电子合同实体--更新请求
 */
@FabricObject()
export class ElectronicContractModelUpdate {
    /** 合同编号*/
    @Property()
    public ContractId: string
    /** 合同更新原因*/
    @Property()
    public ContractUpdateReason: string
    /** 合同细节*/
    @Property()
    public ContractDetail: object
}