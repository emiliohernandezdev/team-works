import {Document} from 'mongoose';

export class Task extends Document{
    readonly _id: String;
    readonly name: String;
    readonly description: String;
    readonly deadline: Number;
    readonly label: String;
    readonly status:  String;
    readonly progress: Number;
    readonly project: String;
}