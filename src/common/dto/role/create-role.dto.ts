import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { getLabel } from "../../utils/get-label";

export class CreateRoleDTO {

  @IsString({ message: getLabel("authority").mustBeString })
  @IsNotEmpty({ message: getLabel("authority").required })
  authority: string

  @IsString({ message: getLabel("description").mustBeString })
  @IsOptional()
  description: string

  @IsArray({ message: getLabel("permissions").invalidFormat })
  @IsNotEmpty({ message: getLabel("permissions").required })
  permissions: string[]

}