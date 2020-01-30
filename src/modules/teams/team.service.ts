import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Team } from './team.object';

@Injectable()
export class TeamService{
    constructor(@InjectModel('Team') private readonly teamModel: Model<Team>){}

    async createTeam(data:any) : Promise<Team>{
        const created = await new this.teamModel(data);
        return created;
    }


}