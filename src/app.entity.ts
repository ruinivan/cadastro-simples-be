export class App {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dataNascimento: string;
}
