import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('usuarios')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsuarios() {
    return this.appService.usuarios();
  }
}
