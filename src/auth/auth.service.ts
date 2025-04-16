import { LoginUserDto } from './../users/dto/LoginUser.dto';
import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './../users/dto/CreateUser.dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schemas';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async validadeCreateUser(createUserDto: CreateUserDto) {
    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExist) throw new HttpException('User Already Exist', 400);
    if (createUserDto.password.length < 8)
      throw new HttpException('Password Too Short', 400);
    if (createUserDto.password.length > 20)
      throw new HttpException('Password Too Long', 400);
    if (createUserDto.name.length < 3)
      throw new HttpException('Name Too Short', 400);
    if (createUserDto.name.length > 20)
      throw new HttpException('Name Too Long', 400);
    else {
      if (typeof createUserDto.name === 'string') {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        return new this.userModel(createUserDto).save();
      } else {
        throw new HttpException('Password Invalid', 400);
      }
    }
  }
  async validadeLoginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      email: loginUserDto.email,
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (passwordMatch) {
        throw new HttpException('Login Success', 200);
      }
    } else if (!user) throw new HttpException('Email or password wrong', 400);
  }
}
