import { BaseService } from "./base.service";
import { Role } from "../entities/role.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { RoleDTO } from "../../common/dto/role/role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "../entities/permission.entity";
import { CreateRoleDTO } from "src/common/dto/role/create-role.dto";
import { UserLoggedDetaiDto } from "src/common/dto/authentication/userLoggedDetai.dto";

export class RoleService extends BaseService<Role, RoleDTO> {

  constructor(
    @InjectRepository(Role)
    protected repository: Repository<Role>,
    @InjectRepository(Permission)
    protected permissionsRepository: Repository<Permission>,
  ) {
    super(repository);
  }

  entityToDTO(entity: Role): RoleDTO {
    return new RoleDTO(entity);
  }

  setJoins(query: SelectQueryBuilder<Role>, alias: string): SelectQueryBuilder<Role> {
    return query;
  }

  async create(dto: CreateRoleDTO, user: UserLoggedDetaiDto) {
    
    const permissions = await this.getPermissionsByNames(dto.permissions);

    return this.repository.save({
      ...dto,
      permissions,
      createUserId: user.id
    })
  }

  async getPermissionsByNames(names: string[]): Promise<Permission[]> {
    const queryBuilder = this.permissionsRepository.createQueryBuilder('p');
    const where = 'p.name in (:list)';

    return queryBuilder.where(where, { list: names }).getMany();
  }

  async getAllPermissions(){
    const permissions = await this.permissionsRepository.find();
    return permissions.map( permission => permission.name );
  }

}