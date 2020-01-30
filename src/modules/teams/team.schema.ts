import * as mongoose from "mongoose";
import * as uuid from 'uuid-random';

export const TeamSchema = new mongoose.Schema({
    _id: {type: String, default: uuid()},
    name: String,
    description: String,
    integrants: [
        {
            user: {type: String, ref: 'User'},
            role: String
        }
    ]
});