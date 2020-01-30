import { IsNotEmpty, IsEmail} from 'class-validator';

export class UserDto{
    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    surname: String;

    @IsEmail()
    email: String;

    @IsNotEmpty()
    password: String;
}
