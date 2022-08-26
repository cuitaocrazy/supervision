import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_l_transaction" })
export class Transaction {
    @PrimaryColumn()
    transactionId: string
    @Column()
    contractId: string
    @Column()
    transactionAmt: number
    @Column()
    tranType: string
    @Column()
    tranDate: string
    @Column()
    tranTime: string
    @Column()
    eduSupervisedAccount: string
}