/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    createProductDto.isActive = true;
    try {
      const product = await this.productModel.create(createProductDto);    
      return product;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll() {
    const products = await this.productModel.find().exec();
    return products;
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await  this.findOne(id);

    try {
      if(product) {
        await product.updateOne(updateProductDto);
        return {...product.toJSON(), ...updateProductDto}
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    
    if (product) {
      product.isActive = false;
      product.save();
      return `Product with id ${id} is removed`
    } else {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
  }
}
