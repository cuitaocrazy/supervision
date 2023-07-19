import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { EduOrg } from './EduOrg'

@Entity({ name: "t_b_supervisor_org" })
export class SupervisorOrg {
    @PrimaryColumn()
    supervisorOrgId: string
    @Column()
    supervisorOrgName: string
    @Column()
    parentSupervisorOrgId: string

    @OneToMany(() => EduOrg, (eduOrg) => eduOrg.supervisorOrg)
    eduOrgs: EduOrg[]
}