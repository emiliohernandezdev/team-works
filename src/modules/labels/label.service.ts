import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Label } from './label.object';

@Injectable()
export class LabelService{
    constructor(@InjectModel('Label') private readonly labelModel: Model<Label>){}

    async getLabels() : Promise<Label[]>{
        const labels = await this.labelModel.find({$or: [
            {
                project: null
            },
            {
                project: ""
            }
        ]}).exec();
        return labels;
    }

    async getProjectLabels(id:any) : Promise<Label[]>{
        const labels = await this.labelModel.find({project: id}).exec();
        return labels;
    }

    async createLabel(data: any) : Promise<Label>{
        const created = await new this.labelModel(data);
        return created.save();
    }

    async updateLabel(id:any, update:any) : Promise<Label>{
        const up = await this.labelModel.findByIdAndUpdate(id, update, {new: true});
        return up;
    }

    async deleteLabel(id:any){
        const deleted = await this.labelModel.findByIdAndDelete(id);
        return deleted;
    }

}