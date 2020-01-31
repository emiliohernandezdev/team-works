import * as mongoose from "mongoose";
import * as shortid from 'shortid';

export const TeamSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    name: String,
    description: String,
    integrants: [
        {
            user: {type: String, ref: 'User'},
            role: String
        }
    ]
});