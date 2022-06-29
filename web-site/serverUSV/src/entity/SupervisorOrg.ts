import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_supervisor_org" })
export class SupervisorOrg {
    @PrimaryColumn()
    supervisorOrgId: string
    @Column()
    supervisorOrgName: string
    @Column()
    parentSupervisorOrgId: string

}