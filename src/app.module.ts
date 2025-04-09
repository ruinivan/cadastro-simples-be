import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://victor:senhabanco@estudo.mk85lop.mongodb.net/cadastro-simples',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
