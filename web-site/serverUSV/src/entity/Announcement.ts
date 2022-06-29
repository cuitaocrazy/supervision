import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_announcement" })
export class Announcement {
    @PrimaryColumn()
    announcement_id: string
    @Column()
    announcement_date: string
    @Column()
    announcement_time: number
    @Column()
    announcement_announcer: number
    @Column()
    announcement_title: number
    @Column()
    announcement_content: string
    @Column()
    announcement_status: string
}