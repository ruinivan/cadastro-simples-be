import { LoginUserDto } from './../users/dto/LoginUser.dto';
import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './../users/dto/CreateUser.dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '../users/dto/UpdateUser.dto';
import * as bcrypt from 'bcrypt';
import * as moongoose from 'mongoose';

export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async validateCreateUser(createUserDto: CreateUserDto) {
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
        await new this.userModel(createUserDto).save();
        throw new HttpException('User created sucessfully', 201);
      } else {
        throw new HttpException('Password Invalid', 400);
      }
    }
  }
  async validateLoginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      email: loginUserDto.email,
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (passwordMatch) throw new HttpException('Login Success', 200);
      else throw new HttpException('Email or password wrong', 400);
    } else throw new HttpException('Email or password wrong', 400);
  }

  async validateGetUser(id: string) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID Invalid', 400);
    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new HttpException('User Dont Found', 404);
    return findUser;
  }

  async validateUpdateUser(id: string, updateUserDto: UpdateUserDto) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID Invalid', 400);
    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new HttpException('User Dont Found', 404);
    if (updateUserDto.password.length < 8)
      throw new HttpException('Password Too Short', 400);
    if (updateUserDto.password.length > 20)
      throw new HttpException('Password Too Long', 400);
    if (updateUserDto.name.length < 3)
      throw new HttpException('Name Too Short', 400);
    if (updateUserDto.name.length > 20)
      throw new HttpException('Name Too Long', 400);
    else {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      await this.userModel.findByIdAndUpdate(id, updateUserDto);
      throw new HttpException('User updated sucessfully', 200);
    }
  }

  async validateDeleteUser(id: string) {
    const Invalid = moongoose.Types.ObjectId.isValid(id);
    if (!Invalid) throw new HttpException('ID Invalid', 400);
    const deleteUser = await this.userModel.findById(id);
    if (!deleteUser) throw new HttpException('User Dont Found', 404);
    return this.userModel.findByIdAndDelete(id);
  }
}
