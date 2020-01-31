import * as mongoose from "mongoose";
import * as uuid from 'uuid-random';

export const TaskSchema = new mongoose.Schema({
    _id: {type: String, default: uuid()},
    name: String,
    description: String,
    deadline: Number,
    label: {type: String, ref: "Label"},
    status:  String,
    progress: Number,
    project: {type: String, ref: "Project"}
});