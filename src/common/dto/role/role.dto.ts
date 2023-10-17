import { Role } from "../../../app/entities/role.entity";

export class RoleDTO {

  id: string
  authority: string
  permissions: string[]

  constructor(role: Role) {
    this.id = role.id;
    this.authority = role.authority;
  }


}