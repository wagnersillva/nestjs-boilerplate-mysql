import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
export abstract class BaseController<T> {

  protected constructor(
    protected readonly service

  ) {
  }

  abstract findAll(...args);

  abstract findOne(...args);

  abstract create(...args);

  abstract update(...args);

  abstract delete(...args);

}