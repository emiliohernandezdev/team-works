import { Controller, Get, Param, Post, Body, Patch, Delete, Res, UseGuards, Req, UseInterceptors, UploadedFile} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeamDto } from './team.dto';
import { TeamService } from './team.service';
import { Team } from './team.object';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { extname } from 'path';
import {resolve} from 'path';

@Controller('teams')
export class TeamController {
  constructor(private service: TeamService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getTeams(@Req() req) : Promise<Team[]>{
    return await this.service.getTeams(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('id/:id')
  async findTeam(@Param('id') id:any, @Res() res){
    const find = await this.service.findOne(id);
    if(!find) return res.status(200).send({message: 'El equipo no existe.'});
    return res.status(200).send({message: 'Equipo encontrado.', team: find});
  }
  



  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createTeam(@Body() data: TeamDto, @Res() res){
    const created = await this.service.createTeam(data);
    if(!created) return res.status(200).send({message: 'El equipo no fue creado.'});
    return res.status(200).send({message: 'Equipo creado con exito.', team: created});
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Post('set-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/teams',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          return cb(null, `${req.params.id}${extname(file.originalname)}`)
        }
      }),
    })
  )
  async uploadFile(@UploadedFile() file, @Param('id') id:any, @Res() res:any, @Req() req:any){
    const find = await this.service.findOne(id);
    if(req.user.userId == find.integrants[0].user){
      const up = await this.service.setImage(id, file.filename)
      if(up) return res.status(200).send({message: 'Imagen subida con éxito.', team: up})
      return res.status(200).send({message: 'Error al subir la imagen'})
    }else{
      return res.status(200).send({message: 'No es propietario, no puede cambiar la foto.'})
    }
  }


  @Get('image/:id')
  async getImage(@Param('id') id:any, @Res() res:any){
    const team = await this.service.findOne(id);
    return res.sendFile(resolve(`./uploads/teams/${team.image}`));
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('join/:id')
  async joinTeam(@Body() body:any, @Res() res:any, @Param('id') id:any){
    
  }

  @Get('exists/:id')
  async existsTeam(@Param('id') id:any, @Res() res:any){
    const team = await this.service.verifyOne(id);
    if(team) return res.status(200).send({team: team});
    return res.status(200).send({message: "El equipo no existe. Verifique el ID."});
  }


}
