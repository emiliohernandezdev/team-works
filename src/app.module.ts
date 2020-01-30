import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {resolve} from 'path'
import {LabelModule} from './modules/labels/label.module';
import { TeamModule } from './modules/teams/team.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: resolve('./.env'),
    isGlobal: true
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('DATABASE_URL'),
    }),
    inject: [ConfigService],
  }),
  UsersModule,
  LabelModule,
  TeamModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
}
