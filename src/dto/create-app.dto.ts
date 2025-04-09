import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dataNascimento: string;
}
