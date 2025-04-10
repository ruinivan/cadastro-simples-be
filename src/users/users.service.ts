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
    // Procurar se ja existe um usuario com o mesmo nome
    // Caso sim retornar uma mensagem de erro amigavel
    const userExists = await this.userModel.findOne({
      nome: createUserDto.nome,
    });
    if (userExists) throw new HttpException('Usuario ja existe', 400);
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async loginUser(LoginUserDto: LoginUserDto) {
    const userExists = await this.userModel.findOne({
      email: LoginUserDto.email,
      senha: LoginUserDto.senha,
    });
    if (!userExists) throw new HttpException('Usuario nao existe', 400);
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
