import { Controller, Get, Param, Post, Body, Patch, Delete, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeamDto } from './team.dto';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private service: TeamService) {}

  @Post('create')
  async createTeam(@Body() data: TeamDto, @Res() res){
    const created = await this.service.createTeam(data);
    if(!created) return res.status(200).send({message: 'El equipo no fue creado.'});
    return res.status(200).send({message: 'Equipo creado con exito.', team: created});
  }


}
