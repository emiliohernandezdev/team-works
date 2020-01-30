import { IsNotEmpty } from 'class-validator';

export class LabelDto{
    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    description: String;

    @IsNotEmpty()
    color: String;
}
