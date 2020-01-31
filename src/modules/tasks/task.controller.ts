import { Controller, Get, Param, Post, Body, Patch, Delete, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('tasks')
export class TaskController {
  constructor() {}

  @Post('create')
  async create(data:any){
    
  }



}
