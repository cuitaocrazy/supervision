import { Entity, PrimaryColumn, Column } from "typeorm";
import { EduOrg } from "./EduOrg";

@Entity({ name: "t_b_supervisor_black_edu" })
export class SupervisorBlackEdu {
  @PrimaryColumn()
  eduId: string;
  eduName: string;
  @Column()
  blackEduCreateDate: string;
  @Column()
  blackEduCreateTime: string;
  @Column()
  blackEduCreateReason: string;
  eduOrg: EduOrg;
}
