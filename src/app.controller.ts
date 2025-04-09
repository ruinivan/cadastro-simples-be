import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/uptade-app.dto';
import { get } from 'mongoose';

@Controller('usuarios')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createAppDto: CreateAppDto) {
    return this.appService.create(createAppDto);
  }

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.appService.getOne(+id);
  }

  @Patch(':id')
  uptade(@Param(':id') id: number, @Body() updateAppDto: UpdateAppDto) {
    return this.appService.update(+id, updateAppDto);
  }

  @Delete(':id')
  delete(@Param(':id') id: number) {
    return this.appService.remove(+id);
  }
}
