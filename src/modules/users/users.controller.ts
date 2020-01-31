import { Controller, Get, Post, Body, Res, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './user.dto';
import { User } from './user.object';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname, resolve} from 'path';
import { AuthGuard } from '@nestjs/passport';
import { MailerService } from '@nest-modules/mailer';
@Controller('users')
export class UserController {
  constructor(private service: UserService, private mailer: MailerService) {}


  @Post('login')
  async doLogin(@Body() form){
      return await this.service.login(form.email, form.password);
  }

  @Post('register')
  async doRegister(@Body() data: UserDto, @Res() res){
      this.service.getUser(data.email).then((user) => {
          if(user) return res.status(200).send({message: 'El usuario ya existe, no se puede registrar'});
          else{
            this.service.create(data).then(() => {
                return res.status(200).send({message: `Usuario creado con exito`})   
            })
            .catch((err) => {
                return res.status(200).send({message: `Error al crear el usuario. ${err}`})   
            })

            
          }
      })
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req){
      return req.user;
  }


}
