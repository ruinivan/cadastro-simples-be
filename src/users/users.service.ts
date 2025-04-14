import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schemas';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.userModel.findOne({
      email: createUserDto.email,
    });
<<<<<<< HEAD
    if (userExists) throw new HttpException('User Already Exists', 400);
=======
    if (userExists) throw new HttpException('User Already Exist', 400);
>>>>>>> 8e86ce443b84955f1caa0a66af1546e50f4ec6ee
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async loginUser(LoginUserDto: LoginUserDto) {
    const userExists = await this.userModel.findOne({
      email: LoginUserDto.email,
      password: LoginUserDto.password,
    });
    if (!userExists) throw new HttpException('User Dont Exist', 400);
    return userExists;
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
