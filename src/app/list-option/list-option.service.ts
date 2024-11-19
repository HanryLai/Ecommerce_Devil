import { Injectable } from '@nestjs/common';
import { CreateListOptionDto } from './dto/create-list-option.dto';
import { UpdateListOptionDto } from './dto/update-list-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListOptionRepository } from 'src/repositories/ecommerce';
import { ListOptionEntity } from 'src/entities/ecommerce';
import { BaseService } from 'src/common/base';

@Injectable()
export class ListOptionService extends BaseService {
   constructor(
      @InjectRepository(ListOptionEntity)
      private listOptionRepository: ListOptionRepository,
   ) {
      super();
   }

   async findAll() {
      return await this.listOptionRepository.find();
   }

   async findListOptionOfProduct(productId: string) {
      return '';
   }
}
