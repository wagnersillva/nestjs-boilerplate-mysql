import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthenticationService } from "../../../services/authentication.service";
import { Reflector } from "@nestjs/core";
import { UserLoggedDetaiDto } from "../../../../common/dto/authentication/userLoggedDetai.dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private configService: ConfigService,
    private readonly reflector: Reflector
  ) {}

  private request: any;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.request = this.getRequest(context);

    await this.verifyToken();

    const isAuthorized = await this.validatePermissions(context) && await this.validateRoles(context)

    return isAuthorized;
  }

  private getRequiredRoles(context: ExecutionContext){
    return this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()],);
  }

  private async hasRole(userContext: UserLoggedDetaiDto, requiredRoles: string[]){
    const { roles: rolesUser } = userContext || {};
    return rolesUser?.some((role: string) => requiredRoles?.includes(role) );
  }

  private async validateRoles(context: ExecutionContext){
    const requiredRoles = this.getRequiredRoles(context);
    const user = context.switchToHttp().getRequest().user;
      
    if (!requiredRoles)
      return true;

    return this.hasRole(user, requiredRoles);
  }

  private getRequiredPermissions(context: ExecutionContext){
    return this.reflector.getAllAndOverride<string[]>('permissions', [context.getHandler(), context.getClass()],);
  }

  private async hasPermission(userContext: UserLoggedDetaiDto, requiredPermissions: string[]){
    const { permissions: permissionsUser } = userContext || {};
    return permissionsUser?.some((permission: string) => requiredPermissions?.includes(permission) );
  }

  private async validatePermissions(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.getRequiredPermissions(context);
    const user = context.switchToHttp().getRequest().user;

    if (!requiredPermissions)
      return true;

    return this.hasPermission(user, requiredPermissions);
  }

  private getRequest(context: ExecutionContext){
    return context.switchToHttp().getRequest();
  }

  private getHeader(header: string) {
    return this?.request?.headers[header];
  }

  private getToken(): string | undefined {
    const [type, token] = this.request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(){
    const token = this.getToken();

    if (!token) throw new UnauthorizedException();
    
    try {
      this.request['user'] = await this.authService.verifyToken(token);
    } catch (e) {
      console.log({ e })
      throw new UnauthorizedException();
    }
  }

}