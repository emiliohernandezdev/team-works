import {Document} from 'mongoose';

export class Project extends Document{
    readonly _id: String;
    readonly name: String;
    readonly description: String;
    readonly owner: String;
    readonly team: String;
    readonly files: Array<any>;
}