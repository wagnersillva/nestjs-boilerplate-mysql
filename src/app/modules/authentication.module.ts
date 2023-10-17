import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { AuthenticationService } from "../services/authentication.service";
import { JwtService } from "@nestjs/jwt";
import { AuthenticationController } from "../http/controllers/authentication.controller";

@Module({
  imports: [
    forwardRef(() => UserModule),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtService
  ],
  exports: [
    AuthenticationService
  ]
})
export class AuthenticationModule {}