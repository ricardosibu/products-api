/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    createCategoryDto.isActive = true;
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      return category;
    } catch (error) {
      console.log('error', error)
    }
  }

  async findAll() {
    const category = await this.categoryModel.find().exec();
    return category;
  }

  async findOne(id: string) {
    try {
      const category = await  this.categoryModel.findById(id);
      return category;
    } catch (error) {
        console.log('error', error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    try {
      await category.updateOne(updateCategoryDto);
      return { ...category.toJSON(), ...updateCategoryDto }
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    
    if (category) {
      category.isActive = false;
      category.save();
      return `Category with id ${id} is removed`
    } else {
      throw new NotFoundException(`Category with id ${id} not found`)
    }
  }
}
