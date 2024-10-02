/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  class: string;

  @Prop()
  displacement: number;

  @Prop()
  air_conditioning: boolean

  @Prop()
  doors: number

  @Prop()
  seats: number

  @Prop()
  bag_small: number

  @Prop()
  large_bag: number

  @Prop()
  drive: string;

  @Prop()
  fuel_type: string;

  @Prop()
  make: string;

  @Prop()
  model_name: string;

  @Prop()
  transmission: string;

  @Prop()
  year: number;

  @Prop()
  price: number;

  @Prop()
  isActive: boolean;

  @Prop()
  aditional_feature: string[]

  @Prop()
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
