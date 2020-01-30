import * as mongoose from "mongoose";
import * as uuid from 'uuid-random';

export const LabelSchema = new mongoose.Schema({
    _id: {type: String, default: uuid()},
    name: String,
    description: String,
    color: String,
    project: {type: String, ref: 'Project'}
});