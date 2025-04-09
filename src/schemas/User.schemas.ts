import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  dataNascimento: string;

  @Prop({ required: false })
  telefone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
