import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { SupervisorBlackEdu } from "./SupervisorBlackEdu";
import { EduTeacher } from './EduTeacher';
import { SupervisorOrg } from './SupervisorOrg';
import { Contract } from './Contract';
@Entity({ name: "t_b_edu_org" })
export class EduOrg {
  @PrimaryColumn()
  eduId: string
  @Column()
  eduLogo: string
  @Column()
  eduName: string
  @Column()
  eduAddress: string
  @Column()
  eduLegalPerson: string
  @Column()
  eduLegalPhone: string
  @Column()
  eduContact: string
  @Column()
  eduContactPhone: string
  @Column()
  eduIsPublic: number
  @Column()
  eduLicense: string
  @Column()
  eduStatus: string
  @Column()
  eduAnnualInspection: string
  @Column()
  eduAnnualInspectionDate: string
  @Column()
  eduAnnualInspectionTime: string
  @Column()
  eduSupervisedAccount: string
  @Column()
  eduNormalAccount: string
  @Column()
  eduSupervisedMerNo: string
  @Column()
  eduCreateDate: string
  @Column()
  eduCreateTime: string
  @Column()
  eduUpdateDate: string
  @Column()
  eduUpdateTime: string
  @Column({
    precision: 3,
    scale: 1
  })
  eduRating: number
  @Column()
  eduLoginName: string
  @Column()
  eduPassword: string
  @Column()
  supervisorOrgId: string
  @Column()
  eduProvince: string
  @Column()
  eduCity: string
  @Column()
  eduArea: string
  @Column()
  merNo: string
  //黑名单
  blackEdu: SupervisorBlackEdu;
  // 教师
  @OneToMany(() => EduTeacher, (eduTeacher) => eduTeacher.eduOrg)
  eduTeachers: EduTeacher[]
  // 所属机构
  @ManyToOne(() => SupervisorOrg, (supervisorOrg) => supervisorOrg.eduOrgs)
  // 机构信息
  @JoinColumn({ name: "supervisor_org_id" })
  supervisorOrg: SupervisorOrg
  // 合约列表
  @OneToMany(() => Contract, (contract) => contract.eduOrg)
  contracts: Contract[]
}
