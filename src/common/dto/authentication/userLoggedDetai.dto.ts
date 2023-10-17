import { User } from "../../../app/entities/user.entity";
import { Role } from "../../../app/entities/role.entity";

export class UserLoggedDetaiDto {
  id: string;
  username: string;
  email: string;
  permissions: string[];
  roles: string[];

  constructor(user: User) {
    const { id, email, username } = user
    this.id = id;
    this.email = email;
    this.username = username;
    this.roles = user?.roles?.map(role => role.authority);
    this.permissions = this.getPermissions(user?.roles);
  }

  getPermissions(roles: Role[]){
    const listPermissions: Set<string> = new Set();

    roles?.forEach(({ permissions }) => (
      permissions?.forEach(({ name }) => (
        listPermissions.add(name)
      ))
    ));

    return [...listPermissions];
  }

}