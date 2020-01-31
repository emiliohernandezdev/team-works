import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Project } from './project.object';

@Injectable()
export class ProjectService{
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>){}

    async getOne(id:any) : Promise<Project>{
        const find = await this.projectModel.findById(id).exec();
        return find;
    }

    async create(data:any) : Promise<Project>{
        const created = await new this.projectModel(data);
        return created.save();
    }

    async update(id:any, update:any) : Promise<Project>{
        const updated = await this.projectModel.findByIdAndUpdate(id, update, {new: true});
        return updated;
    }

    async myProjects(user:any) : Promise<Project[]>{
        const projects = await this.projectModel.find({owner: user}).exec();
        return projects;
    }

    async deleteProject(id:any) : Promise<Project>{
        const deleted = await this.projectModel.findByIdAndDelete(id);
        return deleted;
    }

}