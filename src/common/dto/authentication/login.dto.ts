import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { getLabel } from "../../utils/get-label";

export class LoginDTO {

  @IsString({ message: getLabel("username").mustBeString })
  @IsOptional()
  username: string

  @IsEmail({}, { message: getLabel("username").invalidFormat })
  @IsOptional()
  email: string

  @IsString({ message:"password.error.mustBeString.label" })
  @IsNotEmpty({ message: "password.error.notEmpty.label"  })
  password: string

}