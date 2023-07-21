import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { EduOrg } from './EduOrg'

@Entity({ name: "t_l_contract" })
export class Contract {
    @PrimaryColumn()
    contractId: string
    @Column()
    fabricContractId: string
    @Column()
    contractDate: string
    @Column()
    contractTime: string
    @Column()
    contractStatus: string
    @Column()
    contractUpdateDate: string
    @Column()
    contractUpdateTime: string
    @Column()
    contractUpdateReason: string
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
    lessonIntroduce: string
    @Column()
    lessonOutline: string
    @Column()
    lessonStartDate: string
    @Column()
    lessonStartTime: string
    @Column()
    lessonEndDate: string
    @Column()
    lessonEndTime: string
    @Column()
    lessonAttendanceType: string
    @Column()
    lessonTotalQuantity: number
    @Column({
        precision: 12,
        scale: 0
    })
    lessonTotalPrice: number
    @Column({
        precision: 12,
        scale: 0
    })
    lessonPerPrice: number
    @Column()
    teacherId: string
    @Column()
    teacherName: string
    @Column()
    consumerId: string
    @Column()
    consumerName: string
    @Column()
    consumerStuName: string
    @Column()
    orderNo: string
    @Column()
    lessonAccumulationQuantity: string

    @ManyToOne(() => EduOrg, (eduOrg) => eduOrg.contracts)
    @JoinColumn({ name: 'edu_id' })
    eduOrg: EduOrg
}