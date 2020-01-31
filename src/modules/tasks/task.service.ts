import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Task } from './task.object';

@Injectable()
export class TeamService{
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>){}



}