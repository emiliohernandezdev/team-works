import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './user.object';
import * as cryptojs from 'crypto-js';
import { aesConstants } from './auth/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly jwtService: JwtService){}

    async getUser(email: String) : Promise<User>{
        const user = await this.userModel.findOne({email: email.toLowerCase()});
        return user;
    }

    async findOne(id:any) : Promise<User>{
        const user = await this.userModel.findById(id);
        return user;
    }

    async login(email:string, password: string){
        const user = await this.userModel.findOne({email: email.toLowerCase() });
        if(user){
            let decryption = cryptojs.AES.decrypt(user.password, aesConstants.secret).toString(cryptojs.enc.Utf8);
            if(password == decryption){
                const payload = {email: user.email, password: user.password, sub: user._id, name: user.name.toString(), surname: user.surname.toString()};
                return {
                    access_token: this.jwtService.sign(payload)
                };
            }else{
                return {message: 'Contraseña incorrecta.'}
            }
        }else{
            return {message: 'El usuario no existe.'};
        }

    }

    async validateUser(email: String, pass: String): Promise<any> {
        const user = await this.userModel.findOne({email: email.toLowerCase()});
        console.log(user)
        let dec = cryptojs.AES.decrypt(user.password, aesConstants.secret).toString(cryptojs.enc.Utf8);
        if (user && pass === dec) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    async create(data:any): Promise<User>{
        const createdProvider = new this.userModel(data);
        createdProvider.password = cryptojs.AES.encrypt(data.password, aesConstants.secret);
        return await createdProvider.save();
    }

    async update(id, update:any) : Promise<User>{
        const updatedProvider = await this.userModel.findByIdAndUpdate(id, update, {new: true});
        return updatedProvider;
    }

}