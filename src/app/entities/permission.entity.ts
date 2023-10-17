import { Column, Entity, ManyToMany } from "typeorm";
import { Role } from "./role.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "permission" })
export class Permission extends BaseEntity {

  @Column()
  name: string;

  @ManyToMany(() => Role, role => role.permissions )
  roles: Role[];

}