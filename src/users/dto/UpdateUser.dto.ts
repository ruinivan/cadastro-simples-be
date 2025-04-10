import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsOptional()
  dataNascimento?: string;

  @IsString()
  @IsOptional()
  telefone?: string;
}
