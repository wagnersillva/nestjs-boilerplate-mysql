import { Role } from "src/app/entities/role.entity";
import { User } from "../../../app/entities/user.entity";

interface IUserRole {
  authority: string
  permissions: string[]
}

export class UserDTO {

  id: string
  username: string
  email: string
  roles: IUserRole[]

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;

    this.setListRoles(user.roles);
  }

  setListRoles(roles?: Role[]): void {
    if(!roles) return;

    this.roles = roles.map(({ authority, permissions }) => ({
      authority,
      permissions: permissions?.map( permission => permission.name )
    }));
  }

}