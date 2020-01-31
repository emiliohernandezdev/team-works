import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {resolve} from 'path'
import {LabelModule} from './modules/labels/label.module';
import { TeamModule } from './modules/teams/team.module';
import { ProjectModule } from './modules/projects/project.module';
import { TaskModule } from './modules/tasks/task.module';


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
  TeamModule,
  ProjectModule,
  TaskModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
}
