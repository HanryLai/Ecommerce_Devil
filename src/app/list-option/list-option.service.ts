import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ListOptionRepository, OptionRepository } from 'src/repositories/ecommerce';
import { ListOptionEntity, OptionEntity } from 'src/entities/ecommerce';
import { BaseService } from 'src/common/base';
import { CreateListOptionDto } from './dto/create-list-option.dto';

@Injectable()
export class ListOptionService extends BaseService {
   constructor(
      @InjectRepository(ListOptionEntity)
      private listOptionRepository: ListOptionRepository,
      @InjectRepository(OptionEntity)
      private optionRepository: OptionRepository,
   ) {
      super();
   }

   async create(createListOptionDto: CreateListOptionDto) {
      try {
         const lengthListOption = await this.listOptionRepository.count();
         const orderIndex = lengthListOption + 1;
         const option = await this.optionRepository.find();
         const randomOption = option[Math.floor(Math.random() * option.length)];
         const newListOption = { ...createListOptionDto, orderIndex, option: randomOption };
         return await this.listOptionRepository.save(newListOption);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findAll() {
      return await this.listOptionRepository.find();
   }

   async findListOptionOfOption(optionId: string) {
      const option = await this.optionRepository.findOne({
         where: { id: optionId },
         relations: ['listOptions'],
      });
      return option != null ? option.listOptions : 'Option not found';
   }
}
