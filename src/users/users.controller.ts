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
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';
import * as moongoose from 'mongoose';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.createUser(CreateUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() LoginUserDto: LoginUserDto) {
    return this.usersService.loginUser(LoginUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID Invalid', 400);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User Dont Found', 404);
    return findUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID Invalid', 400);
    const findUser = await this.usersService.updateUser(id, body);
    if (!findUser) throw new HttpException('User Dont Found', 404);
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID Invalid', 400);
    const deleteUser = await this.usersService.deleteUser(id);
    if (!deleteUser) throw new HttpException('User Dont Found', 404);
    throw new HttpException('User Successfully Deleted', 200);
  }
}
