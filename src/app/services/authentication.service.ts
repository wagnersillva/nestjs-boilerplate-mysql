import { UserLoggedDetaiDto } from "../../common/dto/authentication/userLoggedDetai.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "./user.service";
import { RegisterDTO } from "../../common/dto/authentication/register.dto";
import { User } from "../entities/user.entity";
import { BadRequestException, forwardRef, Inject, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "../../common/dto/authentication/login.dto";
import { getLabel } from "../../common/utils/get-label";
import { ResponseLoginDTO } from "../../common/dto/authentication/response-login.dto";

export class AuthenticationService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(dto: RegisterDTO): Promise<User> {
    return this.userService.createRegister(dto)
  }

  async login(dto: LoginDTO){
    const { username, email, password } = dto;

    if(!username && !email)
      throw new BadRequestException(getLabel('usernameOrEmail'));

    const user: User = await this.userService.findByUsernameOrEmail(username, email);

    if(!user)
      throw new UnauthorizedException('user.error.emailOrPassword.label');

    if(!(await this.userService.verifyPassword(user.password, password)))
      throw new UnauthorizedException('user.error.emailOrPassword.label');

    return new ResponseLoginDTO(
      await this.generateToken(user),
      this.getJwtType(),
      this.getJwtExpireIn(),
    );

  }

  async verifyToken(token: string): Promise<any> {
    const { sub } = await this.jwtService.verifyAsync(token, { secret: this.getJwtSecret() })

    return new UserLoggedDetaiDto(await this.userService.findById(sub));
  }

  async generateToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      sub: user.id
    };

    let config = {
      secret: this.getJwtSecret(),
      expiresIn: this.getJwtExpireIn()
    }

    return this.jwtService.signAsync(payload, config);
  }

  private getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')
  }

  private getJwtType(): string {
    return this.configService.get<string>('JWT_TYPE')
  }

  private getJwtExpireIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN')
  }

}