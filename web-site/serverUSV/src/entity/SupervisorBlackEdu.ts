import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_supervisor_black_edu" })
export class SupervisorBlackEdu {
    @PrimaryColumn()
    eduId: string
    @Column()
    blackEduCreateDate: string
    @Column()
    blackEduCreateTime: string
    @Column()
    blackEduCreateReason: string
}