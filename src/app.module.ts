import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmFactory } from "./config/database/typeOrmConfig";
import { UserModule } from "./app/modules/user.module";
import { RoleModule } from "./app/modules/role.module";
import { AuthenticationModule } from "./app/modules/authentication.module";
import { Permission } from './app/entities/permission.entity';
import { CheckAuthorizationController } from './app/http/controllers/test-authorization.controller';

const optionsRootAsync = {
  imports: [ConfigModule],
  inject: [ConfigService],
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:  `.env`
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }
        };
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      ...optionsRootAsync,
      useFactory: typeOrmFactory,
    }),
    TypeOrmModule.forFeature([Permission]),
    AuthenticationModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController, CheckAuthorizationController],
  providers: [AppService],
})
export class AppModule {}
