import {Document} from 'mongoose';

export class Label extends Document{
    readonly _id: String;
    readonly name: String;
    readonly description: String;
    readonly color: String;
    readonly project: String;
}