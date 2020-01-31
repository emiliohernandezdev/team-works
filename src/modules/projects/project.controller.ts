import { Controller, Get, Param, Post, Body, Patch, Delete, Res, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { Project } from './project.object';
import {ProjectDto} from './project.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  async create(@Body() data: ProjectDto, @Res() res) {
    const created = await this.projectService.create(data);
    if(!created) return res.status(200).send({message: 'Error al crear el proyecto.'})
    return res.status(200).send({message: 'Proyecto creado con exito.', project: created});
  }

  @Patch('update/:id')
  async update(@Param('id') id:any, @Body() update: ProjectDto, @Res() res, @Req() req){
    const  find = await this.projectService.getOne(id);
    if(find.owner == req.user.userId){
      const updated = await this.projectService.update(id, update);
      if(!updated) return res.status(200).send({message: 'Error al actualizar el proyecto.'})
      return res.status(200).send({message: 'Proyecto actualizado con exito.', project: updated});
    }else{
      return res.status(200).send({message: 'No tiene permisos para actualizar el proyecto.'});
    }

  }

  @Get('my')
  async myProjects(@Req() req) : Promise<Project[]>{
    return await this.projectService.myProjects(req.user.userId)
  }

  @Delete('delete/:id')
  async deleteProject(@Param('id') id, @Res() res, @Req() req){
    const find = await this.projectService.getOne(id);
    if(find.owner == req.user.userId){
      const deleted = await this.projectService.deleteProject(id);
      return res.status(200).send({message: 'Proyecto eliminado con exito'});
    }else{
      return res.status(200).send({message: 'No es propietario del proyecto, no lo puede eliminar. Acceso denegado.'});
    }
  }


}
