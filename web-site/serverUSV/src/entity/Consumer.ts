import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_consumer" })
export class Consumer {
    @PrimaryColumn()
    consumerLoginName: string
    @Column()
    consumerPassword: string
    @Column()
    consumerName: string
    @Column()
    consumerPhone: string
    @Column()
    consumerIdentityNo: string
    @Column()
    consumerBirthday: string
    @Column()
    consumerGender: string
}