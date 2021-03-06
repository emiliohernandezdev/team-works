import * as mongoose from "mongoose";
import * as shortid from 'shortid';

export const UserSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String
});