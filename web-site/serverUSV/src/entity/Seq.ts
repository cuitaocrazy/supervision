import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({ name: "t_b_seq_table" })
export class Seq {
    @PrimaryColumn()
    seq: number
}