import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'User' })
export class User {
  @Prop({ unique: true, required: true })
  nome: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: false })
  dataNascimento: string;

  @Prop({ required: false })
  telefone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
