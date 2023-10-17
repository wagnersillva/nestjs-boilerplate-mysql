import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationService } from "../../services/authentication.service";
import { LoginDTO } from "../../../common/dto/authentication/login.dto";
import { RegisterDTO } from "../../../common/dto/authentication/register.dto";

@Controller("auth")
export class AuthenticationController {

  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("login")
  login(@Body() dto: LoginDTO){
    return this.authenticationService.login(dto);
  }

  @Post("register")
  register(@Body() dto: RegisterDTO){
    return this.authenticationService.register(dto);
  }

}