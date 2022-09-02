import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_announcement" })
export class Announcement {
    @PrimaryColumn()
    announcementId: string
    @Column()
    announcementDate: string
    @Column()
    announcementTime: string
    @Column()
    announcementAnnouncer: number
    @Column()
    announcementTitle: number
    @Column()
    announcementContent: string
    @Column()
    announcementStatus: string
}