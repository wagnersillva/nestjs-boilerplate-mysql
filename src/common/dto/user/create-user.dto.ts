import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { getLabel } from "../../utils/get-label";

export class CreateUserDTO {

  @IsString({ message: getLabel("username").mustBeString })
  @IsNotEmpty({ message: getLabel("username").required })
  username: string

  @IsString({ message: getLabel("password").mustBeString })
  @IsOptional()
  password: string

  @IsEmail( {}, { message: getLabel('email').invalidFormat } )
  @IsNotEmpty({ message: getLabel("email").required })
  email: string

}