import { User } from "../entities/user.entity";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../http/controllers/user.controller";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../services/user.service";
import { AuthenticationModule } from "./authentication.module";
import { RoleModule } from "./role.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthenticationModule),
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService]
})
export class UserModule {}
