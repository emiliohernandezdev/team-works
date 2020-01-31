import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './project.schema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {ProjectGateway} from './project.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    ],
    providers: [
        ProjectService,
        ProjectGateway
    ],
    controllers: [
        ProjectController
    ],
})
export class ProjectModule { }
