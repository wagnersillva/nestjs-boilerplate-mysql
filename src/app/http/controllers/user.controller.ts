import { BaseController } from "./base.controller";
import { User } from "../../entities/user.entity";
import { UserService } from "../../services/user.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUserDTO } from "../../../common/dto/user/create-user.dto";
import { UserLogged } from "../../../common/decorators/user-logged.decorator";
import { UserLoggedDetaiDto } from "../../../common/dto/authentication/userLoggedDetai.dto";
import { UpdateUserDTO } from "../../../common/dto/user/update-user.dto";
import { ParamsDTO } from "../../../common/dto/user/params.dto";
import { UserFilterDTO } from "../../../common/dto/user/filter.dto";

@Controller('users')
export class UserController extends BaseController<User> {

  constructor(protected userService: UserService) {
    super(userService);
  }

  @Get()
  findAll(@Query() filterParams: ParamsDTO) {
    return this.userService.findAll(new UserFilterDTO(filterParams));
  }

  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.userService.findByIdAsDTOOrTrhow(id, 'user')
  }

  @Post()
  create(
    @Body() dto: CreateUserDTO,
    @UserLogged() user: UserLoggedDetaiDto,
  ) {
    return // implement here
  }

  @Put(":id")
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDTO,
    @UserLogged() user: UserLoggedDetaiDto,
  ) {
    return // implement here
  }

  @Delete(":id")
  delete(@Param('id') id: string) {
  }


}