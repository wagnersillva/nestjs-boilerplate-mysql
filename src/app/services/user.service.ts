import { ConflictException } from '@nestjs/common'
import { BaseService } from "./base.service";
import { User } from "../entities/user.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { UserDTO } from "../../common/dto/user/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleService } from "./role.service";
import { RegisterDTO } from "../../common/dto/authentication/register.dto";

export class UserService extends BaseService<User, UserDTO> {

  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
    private readonly roleService: RoleService,
  ) {
    super(repository);
  }

  entityToDTO(entity: User): UserDTO {
    return new UserDTO(entity)
  }

  setJoins(query: SelectQueryBuilder<User>, alias: string): SelectQueryBuilder<User> {
    return query
      .leftJoinAndSelect(`${alias}.roles`, 'r')
      .leftJoinAndSelect(`r.permissions`, 'per');
  }

  async findAll(filter: any){
    return super.findAll(filter);
  }

  async createRegister(dto: RegisterDTO): Promise<User> {
    await this.validEntityForCreate(dto);

    return await this.repository.save({
      ...dto,
      password: await this.getHashValue(dto.password)
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email })
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOneBy({ username })
  }


  async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    return await this.findByUsername(username) || await this.findByEmail(email)
  }

  async validEntityForCreate(dto: RegisterDTO): Promise<void> {
    if(await this.findByEmail(dto.email))
      throw new ConflictException("User with this email already exists.");
    
    if(await this.findByUsername(dto.username))
      throw new ConflictException("User with this username already exists.");
  }

}