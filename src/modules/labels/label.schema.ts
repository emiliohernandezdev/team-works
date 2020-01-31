import * as mongoose from "mongoose";
import * as shortid from 'shortid';
export const LabelSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    name: String,
    description: String,
    color: String,
    project: {type: String, ref: 'Project'}
});