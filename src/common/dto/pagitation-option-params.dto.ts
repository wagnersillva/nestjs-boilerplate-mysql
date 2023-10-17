import { IsOptional, IsString } from "class-validator";

export class PagitationOptionParamsDTO {

  @IsOptional()
  @IsString({ message:"query.page.error.mustBeString.label" })
  page: string

  @IsOptional()
  @IsString({ message:"query.limite.error.mustBeString.label" })
  limit: string


}