import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Team } from './team.object';

@Injectable()
export class TeamService{
    constructor(@InjectModel('Team') private readonly teamModel: Model<Team>){}

    async createTeam(data:any) : Promise<Team>{
        const created = await new this.teamModel(data);
        return created.save();
    }

    async findOne(id:any) : Promise<Team>{
        const find = await this.teamModel.findById(id).populate([
            {
                path: 'integrants.user',
                select: 'name surname email image'
            }
        ])
        return find;
    }

    async getTeams(user:any) : Promise<Team[]>{
        const find = this.teamModel.find({"integrants.user": user}).populate([
            {
                path: 'integrants.user',
                select: 'name surname email image'
            }
        ])
        return find;
    }

    async setImage(id:any, image:any) : Promise<Team>{
        const update = await this.teamModel.findByIdAndUpdate(id, {image: image}, {new: true});
        return update;
    }

    async verifyOne(id:any) : Promise<Team>{
        const find = this.teamModel.findById(id).exec();
        return find;
    }

}