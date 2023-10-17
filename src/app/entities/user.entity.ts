import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntityAudit } from "./base.entity";
import { Role } from "./role.entity";

@Entity({ name: "user" })
export class User extends BaseEntityAudit {

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany( () => Role, role => role.users )
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  roles: Role[]

}