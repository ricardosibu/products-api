/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    createServiceDto.isActive = true;
    try {
      const service = await this.serviceModel.create(createServiceDto);
      return service;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll() {
    const services = await this.serviceModel.find().exec();
    return services;
  }

  async findOne(id: string) {
    try {
      const service = await this.serviceModel.findById(id);
      if (service) return service;
      else throw new NotFoundException('Service not found');
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    try {
      await service.updateOne(updateServiceDto);
      return { ...service.toJSON(), ...updateServiceDto };
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    if (service) {
      service.isActive = false;
      service.save();
      return `Service with id ${id} is removed`;
    } else {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  }
}
