/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    class: string;
  
    @IsNumber()
    displacement: number;
  
    @IsBoolean()
    air_conditioning: boolean
  
    @IsNumber()
    doors: number
  
    @IsNumber()
    seats: number
  
    @IsNumber()
    bag_small: number
  
    @IsNumber()
    large_bag: number
  
    @IsString()
    drive: string;
  
    @IsString()
    fuel_type: string;
  
    @IsString()
    make: string;
  
    @IsString()
    model_name: string;
  
    @IsString()
    transmission: string;
  
    @IsNumber()
    year: number;
  
    @IsNumber()
    price: number;

    @IsBoolean()
    isActive: boolean;
  
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    aditional_feature: string[]
  
    @IsString()
    categoryId: string;
}
