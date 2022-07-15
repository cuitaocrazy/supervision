import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_edu_lesson" })
export class EduLesson {
    @PrimaryColumn()
    lessonId: string
    @Column()
    lessonName: string
    @Column()
    lessonTotalQuantity: number
    @Column()
    lessonPerPrice: number
    @Column()
    lessonTotalPrice: number
    @Column()
    lessonType: string
    @Column()
    lessonIntroduce: string
    @Column()
    lessonImages: string
    @Column()
    lessonOutline: boolean
    @Column()
    lessonStartDate: string
    @Column()
    lessonStartTime: string
    @Column()
    lessonEndDate: string
    @Column()
    lessonEndTime: string
    @Column()
    lessonStatus: string
    @Column()
    lessonCreateDate: string
    @Column()
    lessonCreateTime: string
    @Column()
    lessonUpdateDate: string
    @Column()
    lessonUpdateTime: string
    @Column()
    lessonUpdateReason: string
    @Column()
    eduId: string
    @Column()
    eduName: string
    @Column()
    teacherId: string
    @Column()
    teacherName: string
    @Column()
    lessonAccumulationQuantity: number
}