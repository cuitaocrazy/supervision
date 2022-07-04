import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_l_attendance" })
export class Attendance {
    @PrimaryColumn()
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
    attendanceLessonQuantity: number
    @Column()
    eduId: string
    @Column()
    eduName: string
    @Column()
    lessonId: string
    @Column()
    lessonName: string
    @Column()
    consumerId: string
    @Column()
    consumerName: string
    @Column()
    consumerStuName: string
    @Column()
    attendanceStatus: string
    @Column()
    attendanceUpdateDate: string
    @Column()
    attendanceUpdateTime: string
    @Column()
    attendanceUpdateReason: string
}