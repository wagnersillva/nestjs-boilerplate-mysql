import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntityAudit } from "./base.entity";
import { User } from "./user.entity";
import { Permission } from "./permission.entity";

@Entity({ name: "role" })
export class Role extends BaseEntityAudit {

  @Column()
  authority: string;

  @Column({ nullable: true })
  description: string

  @ManyToMany(() => Permission, permission => permission.id )
  @JoinTable({
    name: "permission_roles",
    joinColumn: {
      name: "role_id",
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: "permission_id",
      referencedColumnName: "id"
    }
  })
  permissions: Permission[];

  @ManyToMany(() => User, user => user.roles )
  users: User[];

}