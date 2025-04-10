import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsDateString()
  @IsOptional()
  dataNascimento: string;

  @IsString()
  @IsOptional()
  telefone?: string;
}
