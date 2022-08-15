import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_chaincode" })
export class ChainCode {
    @PrimaryColumn()
    chaincodeName: string
    @Column()
    sn: string
    @Column()
    deployDate: string
    @Column()
    version: string
    @Column()
    chaincodeDesc: string
    @Column()
    nodeNumber: number

}