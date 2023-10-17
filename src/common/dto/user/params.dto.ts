import { IsOptional, IsString } from "class-validator";
import { PagitationOptionParamsDTO } from "../pagitation-option-params.dto";

export class ParamsDTO extends PagitationOptionParamsDTO{

  @IsOptional()
  @IsString({ message:"user.username.error.mustBeString.label" })
  username: string

  @IsOptional()
  @IsString({ message:"user.email.error.mustBeString.label" })
  email: string

  @IsOptional()
  @IsString({ message:"user.filter.order.error.mustBeString.label" })
  order: string

  @IsOptional()
  @IsString({ message:"user.filter.sort.error.mustBeString.label" })
  sort: string

}