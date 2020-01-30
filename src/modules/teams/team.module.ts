import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './team.schema';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamGateway } from './team.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
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
