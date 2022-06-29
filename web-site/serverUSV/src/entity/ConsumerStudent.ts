import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_consumer_student" })
export class ConsumerStudent {
    @PrimaryColumn()
    consumerLoginName: string
    @Column()
    consumerStuName: string
    @Column()
    consumerStuBirthday: string
    @Column()
    consumerStuType: string
    @Column()
    consumerStuGender: string
}