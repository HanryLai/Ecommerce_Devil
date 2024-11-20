import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { CurrentUserDto } from 'src/common/interceptor';
import { CartItemEntity, ProductEntity, ShoppingCartEntity } from 'src/entities/ecommerce';
import {
   CartItemRepository,
   ProductRepository,
   ShoppingCartRepository,
} from 'src/repositories/ecommerce';
import { EntityManager } from 'typeorm';

@Injectable()
export class CartService extends BaseService {
   constructor(
      @InjectRepository(ShoppingCartEntity)
      private readonly shoppingCartRepository: ShoppingCartRepository,
      @InjectRepository(ProductEntity)
      private readonly productRepository: ProductRepository,
      @InjectRepository(CartItemEntity)
      private readonly cartItemRepository: CartItemRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async createNewCart(user: CurrentUserDto) {
      try {
         const userCart = await this.shoppingCartRepository.findOne({
            where: { user_id: user.id },
         });
         if (userCart) {
            return userCart;
         } else {
            return await this.shoppingCartRepository.save({
               user_id: user.id,
            });
         }
      } catch (err) {
         this.ThrowError(err);
      }
   }
}
