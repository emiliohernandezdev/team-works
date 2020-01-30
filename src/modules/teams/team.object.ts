import {Document} from 'mongoose';

export class Team extends Document{
    readonly _id: String;
    readonly name: String;
    readonly description: String;
    readonly integrants: Array<any>;
}