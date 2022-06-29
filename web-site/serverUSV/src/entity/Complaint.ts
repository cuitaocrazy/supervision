import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_complaint" })
export class Complaint {
    @PrimaryColumn()
    consumerId: string
    @Column()
    eduId: string
    @Column()
    complaintDate: string
    @Column()
    complaintTime: string
    @Column()
    complaintType: string
    @Column()
    consumerName: string
    @Column()
    consumerPhone: string
    @Column()
    eduName: string
    @Column()
    eduContact: string
    @Column()
    eduContactPhone: string
    @Column()
    complaintTitle: string
    @Column()
    complaintContent: string
    @Column()
    complaintStatus: string
    @Column()
    complaintGrade: string
    @Column()
    complaintDescResu: string
}