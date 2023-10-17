import { createParamDecorator } from "@nestjs/common";

export const UserLogged = createParamDecorator((_: unknown, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user
});