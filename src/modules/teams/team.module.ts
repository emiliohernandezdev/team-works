import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './team.schema';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamGateway } from './team.gateway';
import { MulterModule } from '@nestjs/platform-express';
import {resolve} from 'path';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
        MulterModule.register({
            dest: resolve('./uploads/teams')
        })
    ],
    providers: [
        TeamService,
        TeamGateway
    ],
    controllers: [
        TeamController
    ],
})
export class TeamModule { }
