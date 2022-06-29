import { Entity, PrimaryColumn, Column } from 'typeorm'

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
    lessionTotalQuantity: number
    @Column({
        precision: 12,
        scale: 0
    })
    lessionTotalPrice: number
    @Column({
        precision: 12,
        scale: 0
    })
    lessionPerPrice: number
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

}