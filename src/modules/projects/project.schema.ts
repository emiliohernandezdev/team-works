import * as mongoose from "mongoose";
import * as uuid from 'uuid-random';

export const ProjectSchema = new mongoose.Schema({
    _id: {type: String, default: uuid()},
    name: String,
    description: String,
    owner: {type: String, ref: 'User'},
    team: {type: String, ref: 'Team'},
    files: []
});