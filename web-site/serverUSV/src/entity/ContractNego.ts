import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_contract_nego" })
export class ContractNego {
    @PrimaryColumn()
    negoId: string
    @Column()
    contractId: string
    @Column()
    negoType: string
    @Column()
    negoReason: string
    @Column()
    negoCreator: string
    @Column()
    negoStatus: string
    @Column()
    negoCreateDate: string
    @Column()
    negoCreateTime: string
    @Column()
    negoUpdateDate: string
    @Column()
    negoUpdateTime: string
    @Column({
        precision: 12,
        scale: 0
    })
    negoRefundAmt: number
    @Column({
        precision: 12,
        scale: 0
    })
    negoCompensationAmt: number
    @Column()
    negoConsumerAgree: boolean
    @Column()
    negoConsumerAgreeDate: string
    @Column()
    negoConsumerAgreeTime: string
    @Column()
    negoEduAgree: boolean
    @Column()
    negoEduAgreeDate: string
    @Column()
    negoEduAgreeTime: string
}