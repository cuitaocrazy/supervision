import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_supervisor_user" })
export class SupervisorUser {
    @PrimaryColumn()
    supervisorLoginName: string
    @Column()
    supervisorPassword: string
    @Column()
    supervisorUsername: string
    @Column()
    supervisorPhone: string
    @Column()
    supervisorOrgId: string
}