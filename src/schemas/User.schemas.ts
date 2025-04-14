import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'User' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  birthDay: string;

  @Prop({ required: false })
  telephone?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
