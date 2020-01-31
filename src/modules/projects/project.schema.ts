import * as mongoose from "mongoose";
import * as shortid from 'shortid';

export const ProjectSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    name: String,
    description: String,
    owner: {type: String, ref: 'User'},
    team: {type: String, ref: 'Team'},
    files: []
});