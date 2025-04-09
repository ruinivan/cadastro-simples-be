import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  HttpException,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import * as moongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('usuarios')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() CreateUserDto: CreateUserDto) {
    console.log(CreateUserDto);
    return this.usersService.createUser(CreateUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID invalido', 404);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('Usuario nao encontrado', 404);
    return findUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID invalido', 404);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('Usuario nao encontrado', 404);
    return this.usersService.updateUser(id, body);
  }
}
