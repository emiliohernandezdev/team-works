import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: UserService){
        super();
    }

    async validate(email: String, password: String) : Promise<any>{
        const user = await this.authService.validateUser(email, password);
        console.log(user)
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}