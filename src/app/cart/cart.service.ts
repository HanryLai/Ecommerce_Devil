import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { CurrentUserDto } from 'src/common/interceptor';
import {
   CartItemEntity,
   ListOptionEntity,
   OptionCartEntity,
   OptionEntity,
   ProductEntity,
   ShoppingCartEntity,
} from 'src/entities/ecommerce';
import {
   CartItemRepository,
   ListOptionRepository,
   OptionCartRepository,
   OptionRepository,
   ProductRepository,
   ShoppingCartRepository,
} from 'src/repositories/ecommerce';
import { EntityManager } from 'typeorm';
import { AddItemCartDto } from './dto/add-item-cart.dto';
import { UpdateItemCartDto } from './dto/update-item-cart.dto';

@Injectable()
export class CartService extends BaseService {
   constructor(
      @InjectRepository(ShoppingCartEntity)
      private readonly shoppingCartRepository: ShoppingCartRepository,
      @InjectRepository(ProductEntity)
      private readonly productRepository: ProductRepository,
      @InjectRepository(CartItemEntity)
      private readonly cartItemRepository: CartItemRepository,
      @InjectRepository(OptionCartEntity)
      private readonly optionCartRepository: OptionCartRepository,
      @InjectRepository(ListOptionEntity)
      private readonly listOptionRepository: ListOptionRepository,
      @InjectRepository(OptionEntity)
      private readonly optionRepository: OptionRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async createNewCart(user: CurrentUserDto) {
      try {
         const userCart = await this.shoppingCartRepository.findOne({
            where: { userId: user.id },
         });
         if (userCart) {
            return userCart;
         } else {
            return await this.shoppingCartRepository.save({
               userId: user.id,
            });
         }
      } catch (err) {
         this.ThrowError(err);
      }
   }

   async addProductToCart(user: CurrentUserDto, addItemCartDto: AddItemCartDto) {
      try {
         const userCart = await this.shoppingCartRepository.findOne({
            where: { userId: user.id },
         });
         if (!userCart) {
            this.ThrowError('Cart not found');
         }

         const product = await this.productRepository.findOne({
            where: { id: addItemCartDto.itemId },
         });

         if (!product) {
            this.ThrowError('Product not found');
         }

         const cartItemsOfProduct = await this.cartItemRepository.find({
            where: {
               cart: { userId: userCart.userId },
               item: { id: product.id },
            },
         });

         if (cartItemsOfProduct.length <= 0) {
            const cartAdd = await this.cartItemRepository.save({
               cart: userCart,
               item: product,
               quantity: addItemCartDto.quantity,
            });

            for (const listOptionId of addItemCartDto.listOptionId) {
               const listOption = await this.listOptionRepository.findOne({
                  where: { id: listOptionId },
               });

               if (!listOption) {
                  this.ThrowError('List option not found');
               }

               await this.optionCartRepository.save({
                  cartItemId: cartAdd.id,
                  listOptionId: listOption.id,
               });

               return await this.shoppingCartRepository.findOne({
                  where: { userId: user.id },
                  relations: ['cartItems', 'cartItems.item', 'cartItems.options'],
               });
            }
         } else {
            for (const cartItem of cartItemsOfProduct) {
               const optionCarts = await this.optionCartRepository.find({
                  where: { cartItemId: cartItem.id },
               });

               const listOptionIdOfOptionCartOfCartItem = optionCarts.map(
                  (optionCart) => optionCart.listOptionId,
               );

               const listOptionIdOfAddItemCartDto = addItemCartDto.listOptionId;

               const isOptionCartExist = listOptionIdOfAddItemCartDto.every((listOptionId) =>
                  listOptionIdOfOptionCartOfCartItem.includes(listOptionId),
               );

               // isOptionCartExist = true => update quantity
               // isOptionCartExist = false => create new CartItem

               if (isOptionCartExist) {
                  cartItem.quantity += addItemCartDto.quantity;
                  await this.cartItemRepository.save(cartItem);
               } else {
                  const newCartItem = await this.cartItemRepository.save({
                     cart: userCart,
                     item: product,
                     quantity: addItemCartDto.quantity,
                  });

                  for (const listOptionId of addItemCartDto.listOptionId) {
                     await this.optionCartRepository.save({
                        cartItemId: newCartItem.id,
                        listOptionId: listOptionId,
                     });
                  }
               }

               return await this.shoppingCartRepository.findOne({
                  where: { userId: user.id },
                  relations: ['cartItems', 'cartItems.item', 'cartItems.options'],
               });
            }
         }
      } catch (err) {
         this.ThrowError(err);
      }
   }

   async findCartByUser(user: CurrentUserDto) {
      try {
         return await this.shoppingCartRepository.findOne({
            where: { userId: user.id },
            relations: [
               'cartItems',
               'cartItems.item',
               'cartItems.options',
               'cartItems.options.listOption',
            ],
         });
      } catch (err) {
         this.ThrowError(err);
      }
   }

   async updateCartItem(
      user: CurrentUserDto,
      cartItemId: string,
      updateCartItemDto: UpdateItemCartDto,
   ) {
      try {
         const cartItem = await this.cartItemRepository.findOne({
            where: { id: cartItemId },
         });

         if (!cartItem) {
            this.ThrowError('Cart item not found');
         }

         cartItem.quantity = updateCartItemDto.quantity;
         await this.cartItemRepository.save(cartItem);

         return await this.shoppingCartRepository.findOne({
            where: { userId: user.id },
            relations: ['cartItems', 'cartItems.item', 'cartItems.options'],
         });
      } catch (err) {
         this.ThrowError(err);
      }
   }

   async deleteCartItem(user: CurrentUserDto, cartItemId: string) {
      try {
         const cartItem = await this.cartItemRepository.findOne({
            where: { id: cartItemId },
         });

         if (!cartItem) {
            this.ThrowError('Cart item not found');
         }

         const optionCarts = await this.optionCartRepository.find({
            where: { cartItemId: cartItem.id },
         });

         for (const optionCart of optionCarts) {
            await this.optionCartRepository.remove(optionCart);
         }

         await this.cartItemRepository.remove(cartItem);

         return await this.shoppingCartRepository.findOne({
            where: { userId: user.id },
            relations: ['cartItems', 'cartItems.item', 'cartItems.options'],
         });
      } catch (err) {
         this.ThrowError(err);
      }
   }
}
