import { Controller, Delete, Get, Param, Post, Put, Query, Body } from "@nestjs/common";
import { BaseController } from "./base.controller";
import { Role } from "../../entities/role.entity";
import { RoleService } from "../../services/role.service";
import { ParamsDTO } from "../../../common/dto/role/params.dto";
import { RoleFilterDTO } from "../../../common/dto/role/filter.dto";
import { CreateRoleDTO } from "src/common/dto/role/create-role.dto";
import { UserLogged } from "src/common/decorators/user-logged.decorator";
import { UserLoggedDetaiDto } from "src/common/dto/authentication/userLoggedDetai.dto";

@Controller('roles')
export class RoleController extends BaseController<Role> {

  constructor(protected roleService: RoleService) {
    super(roleService);
  }

  @Get('permissions')
  getAllPermissions(){
    return this.roleService.getAllPermissions();
  }

  @Get()
  findAll(@Query() filterParams: ParamsDTO) {
    return this.roleService.findAll(new RoleFilterDTO(filterParams))
  }

  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.roleService.findByIdAsDTOOrTrhow(id, 'role')
  }

  @Post()
  create(
    @Body() dto: CreateRoleDTO,
    @UserLogged() user: UserLoggedDetaiDto
  ) {
    return this.roleService.create(dto, user)
  }

  @Put()
  update() {
  }

  @Delete()
  delete() {
  }

}