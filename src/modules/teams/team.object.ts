import {Document} from 'mongoose';

export class Team extends Document{
    readonly _id: String;
    readonly name: String;
    readonly description: String;
    readonly image: String;
    readonly integrants: Array<any>;
}