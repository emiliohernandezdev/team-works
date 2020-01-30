import {IsNotEmpty} from 'class-validator';

export class TeamDto{
    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    description: String;
}