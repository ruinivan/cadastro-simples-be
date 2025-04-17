import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schemas';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.authService.validadeCreateUser(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    return await this.authService.validadeLoginUser(loginUserDto);
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.authService.validateUpdateUser(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return await this.authService.validateDeleteUser(id);
  }
}
