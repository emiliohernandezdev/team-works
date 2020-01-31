import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.schema';
import { TaskGateway } from './task.gateway';
import { TaskController } from './task.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    ],
    providers: [
        TaskGateway
    ],
    controllers: [
        TaskController
    ],
})
export class TaskModule { }
