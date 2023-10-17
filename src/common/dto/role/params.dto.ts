import { IsOptional, IsString } from "class-validator";
import { PagitationOptionParamsDTO } from "../pagitation-option-params.dto";

export class ParamsDTO extends PagitationOptionParamsDTO{

  @IsOptional()
  @IsString({ message:"role.authority.error.mustBeString.label" })
  authority: string

  @IsOptional()
  @IsString({ message:"role.filter.order.error.mustBeString.label" })
  order: string

  @IsOptional()
  @IsString({ message:"role.filter.sort.error.mustBeString.label" })
  sort: string

}