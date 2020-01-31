import * as mongoose from "mongoose";
import * as shortid from 'shortid';

export const TaskSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    name: String,
    description: String,
    deadline: Number,
    label: {type: String, ref: "Label"},
    status:  String,
    progress: Number,
    project: {type: String, ref: "Project"}
});