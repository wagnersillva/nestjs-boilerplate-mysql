import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { getLabel } from "../../utils/get-label";

export class RegisterDTO {

  @IsString({ message: getLabel("username").mustBeString })
  @IsNotEmpty({ message: getLabel("username").required })
  username: string

  @IsEmail({}, { message: getLabel("email").invalidFormat })
  @IsNotEmpty({ message: getLabel("email").required })
  email: string

  @IsString({ message: getLabel("email").mustBeString })
  @IsNotEmpty({ message: getLabel("email").required  })
  password: string
}