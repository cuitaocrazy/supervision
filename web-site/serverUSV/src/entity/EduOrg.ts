import { Entity, PrimaryColumn, Column } from 'typeorm'

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
    eduIsPublic: boolean
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


}