import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { ShoppingCartEntity } from 'src/entities/ecommerce';
import { ShoppingCartRepository } from 'src/repositories/ecommerce';
import { EntityManager } from 'typeorm';

@Injectable()
export class ShoppingCartService extends BaseService {
   constructor(
      @InjectRepository(ShoppingCartEntity) private shoppingCartRepository: ShoppingCartRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }
}
