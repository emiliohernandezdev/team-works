import * as mongoose from "mongoose";
import * as uuid from 'uuid-random';

export const UserSchema = new mongoose.Schema({
    _id: {type: String, default: uuid()},
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String
});