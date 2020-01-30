import { Controller, Get, Param, Post, Body, Patch, Delete, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LabelService } from './label.service';
import { LabelDto } from './label.dto';

@Controller('labels')
export class LabelController {
  constructor(private service: LabelService) {}

  @Get('/')
  async getLabels(){
    return await this.service.getLabels();
  }

  @Get('project/:id')
  async getLabelsByProject(@Param('id') id:any){
    return await this.service.getProjectLabels(id);
  }

  @Post('create')
  async createLabel(@Body() data: LabelDto, @Res() res){
    const created = await this.service.createLabel(data);
    if(!created) return res.status(200).send({message: 'Error al crear la etiqueta'});
    return res.status(200).send({message: 'Etiqueta creada con exito', label: created});
  }

  @Patch('update/:id')
  async updateLabel(@Param('id') id:any, @Body() update: LabelDto, @Res() res){
      const label = await this.service.updateLabel(id, update);
      if(!label) return res.status(200).send({message: 'Error al actualizar la etiqueta'});
      return res.status(200).send({message: 'Etiqueta actualizada con exito', label: label});
  }

  @Delete('delete/:id')
  async deleteLabel(@Param('id') id:any, @Res() res){
      const deleted = await this.service.deleteLabel(id);
      if(!deleted) return res.status(200).send({message: 'Error al eliminar la etiqueta'});
      return res.status(200).send({message: 'Etiqueta eliminada con exito'});
  }

}
