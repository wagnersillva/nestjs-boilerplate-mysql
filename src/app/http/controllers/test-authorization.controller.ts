import { Controller, Get, UseGuards } from "@nestjs/common";
import { HasRole } from "../auth/role.validate";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { HasPermission } from "../auth/permission.validate";

@Controller('check-authorization')
export class CheckAuthorizationController {

    @UseGuards(JwtAuthGuard)
    @HasRole('ADMIN')
    @Get('only-allow-role-admin')
    onlyRoleAdmin(){
        return 'has permission'
    }

    @UseGuards(JwtAuthGuard)
    @Get('allow-all-users')
    allowAllUsers(){
        return 'has permission'
    }

    @UseGuards(JwtAuthGuard)
    @HasPermission('user-create')
    @Get('only-allow-create-user-permission')
    onlyAllowCreateUserPermission(){
        return 'has permission'
    }

    @Get('permit-all')
    permitAll(){
        return 'permit all'
    }

}