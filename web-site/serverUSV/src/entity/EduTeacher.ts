import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_edu_teacher" })
export class EduTeacher {
    @PrimaryColumn()
    teacherId: string
    @Column()
    teacherName: string
    @Column()
    teacherIdentityNo: string
    @Column()
    teacherField: string
    @Column()
    teacherExperience: number
    @Column()
    teacherIntroduce: string
    @Column({
        precision: 3,
        scale: 1
    })
    teacherRating: number
    @Column()
    teacherCreateDate: string
    @Column()
    teacherCreateTime: string
    @Column()
    teacherUpdateDate: string
    @Column()
    teacherUpdateTime: string
}