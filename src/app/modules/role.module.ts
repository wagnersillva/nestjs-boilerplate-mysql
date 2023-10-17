import { RoleService } from "../services/role.service";
import { JwtService } from "@nestjs/jwt";
import { RoleController } from "../http/controllers/role.controller";
import { Permission } from "../entities/permission.entity";
import { Role } from "../entities/role.entity";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationModule } from "./authentication.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    forwardRef(() => AuthenticationModule)
  ],
  controllers: [RoleController],
  providers: [RoleService, JwtService],
  exports: [RoleService]
})
export class RoleModule {}