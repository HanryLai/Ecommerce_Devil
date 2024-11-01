import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { BaseService } from 'src/common/base';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionEntity, ProductEntity } from 'src/entities/ecommerce';
import { OptionRepository, ProductRepository } from 'src/repositories/ecommerce';

@Injectable()
export class OptionService extends BaseService {
   constructor(
      @InjectRepository(OptionEntity) private optionRepository: OptionRepository,
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
   ) {
      super();
   }

   async create(createOptionDto: CreateOptionDto) {
      try {
         const lengthOption = await this.optionRepository.count();
         const orderIndex = lengthOption + 1;
         const products = await this.productRepository.find();
         const randomProduct = products[Math.floor(Math.random() * products.length)];
         const newOption = { ...createOptionDto, orderIndex, product: randomProduct };
         return await this.optionRepository.save(newOption);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async update(id: string, updateOptionDto: UpdateOptionDto) {
      try {
         return await this.optionRepository.update(id, updateOptionDto);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findAll() {
      try {
         return await this.optionRepository.find();
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findById(id: string) {
      try {
         return await this.optionRepository.findOne({
            where: { id },
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
