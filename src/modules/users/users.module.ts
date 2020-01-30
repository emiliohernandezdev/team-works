import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { LocalStrategy } from './auth/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30d' }
        }),
        MailerModule.forRootAsync({
            useFactory: async (cfg: ConfigService) => ({
                transport: `smtp://${cfg.get('MAILER_ACCOUNT')}:${cfg.get('MAILER_PASSWORD')}@${cfg.get('MAILER_DOMAIN')}`,
                defaults: {
                    from: `"Cuentas Pmanager" ${cfg.get('MAILER_ACCOUNT')}`
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            }), 
            inject: [ConfigService],
        })
    ],
    providers: [UserService, LocalStrategy, JwtStrategy],
    controllers: [UserController],
})
export class UsersModule { }
