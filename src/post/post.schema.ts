import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;
@Schema()
export class Post extends Document {
  @Prop({ required: true, trim: true })
  user: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;
  @Prop({ default: Date.now })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
