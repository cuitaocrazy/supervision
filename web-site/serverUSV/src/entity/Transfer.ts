import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_l_transfer" })
export class Transfer {
    @PrimaryColumn()
    transferId: string
    @Column()
    attendanceId: string
    @Column()
    contractId: string
    @Column()
    fabricContractId: string
    @Column()
    attendanceDate: string
    @Column()
    attendanceTime: string
    @Column()
    attendanceType: string
    @Column()
    eduId: string
    @Column()
    eduName: string
    @Column()
    lessonId: string
    @Column()
    lessonName: string
    @Column()
    lessonType: string
    @Column()
    consumerId: string
    @Column()
    consumerName: string
    @Column()
    consumerStuName: string
    @Column()
    tranLsId: string
    @Column()
    supversingAccount: string
    @Column()
    normalAccount: string
    @Column({
        precision: 12,
        scale: 0
    })
    transferAmt: number
    @Column()
    transferResult: string
    @Column()
    reason: string
}