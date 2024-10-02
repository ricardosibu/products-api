/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Category extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop()
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);