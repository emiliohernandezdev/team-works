import {Document} from 'mongoose';

export class User extends Document{
    readonly _id: String;
    readonly name: String;
    readonly surname: String;
    readonly email: String;
    readonly password: String;
    readonly role: String;
    readonly image: String;
}