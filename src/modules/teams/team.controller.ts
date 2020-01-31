import { Controller, Get, Param, Post, Body, Patch, Delete, Res, UseGuards, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeamDto } from './team.dto';
import { TeamService } from './team.service';
import { Team } from './team.object';

@UseGuards(AuthGuard('jwt'))
@Controller('teams')
export class TeamController {
  constructor(private service: TeamService) {}

  @Get('/')
  async getTeams(@Req() req) : Promise<Team[]>{
    return await this.service.getTeams(req.user.userId);
  }



  @Post('create')
  async createTeam(@Body() data: TeamDto, @Res() res){
    const created = await this.service.createTeam(data);
    if(!created) return res.status(200).send({message: 'El equipo no fue creado.'});
    return res.status(200).send({message: 'Equipo creado con exito.', team: created});
  }


}
