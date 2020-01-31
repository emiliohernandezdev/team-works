import {IsNotEmpty} from 'class-validator';

export class ProjectDto{
    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    description: String;

    @IsNotEmpty()
    team: String
}