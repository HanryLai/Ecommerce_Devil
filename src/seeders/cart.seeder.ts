import { AuthService } from '@/app/auth';
import { CartService } from '@/app/cart/cart.service';
import { BaseService } from '@/common/base';
import { AccountEntity } from '@/entities/auth';
import {
   CartItemEntity,
   ListOptionEntity,
   OptionEntity,
   ProductEntity,
} from '@/entities/ecommerce';
import { AccountRepository } from '@/repositories/auth';
import {
   CartItemRepository,
   ListOptionRepository,
   OptionRepository,
   ProductRepository,
} from '@/repositories/ecommerce';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export class CartSeeder extends BaseService {
   constructor(
      @Inject() private authService: AuthService,
      @Inject() private cartService: CartService,
      @InjectRepository(CartItemEntity) private cartItemRepository: CartItemRepository,
      @InjectRepository(ProductEntity)
      private productRepository: ProductRepository,
      @InjectRepository(OptionEntity) private optionRepository: OptionRepository,
      @InjectRepository(ListOptionEntity) private listOptionRepository: ListOptionRepository,
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
   ) {
      super();
   }

   async run() {
      try {
         const foundCart = await this.cartItemRepository.find();
         const users = await this.accountRepository.find();
         const products = await this.productRepository.find();
         if (foundCart.length === 0) {
            for (const user of users) {
               // Random 6 products from products
               const randomProducts = products.slice(0, Math.floor(Math.random() * 3) + 7);
               for (const product of randomProducts) {
                  const options = await this.optionRepository.find({
                     where: {
                        product: {
                           id: product.id,
                        },
                     },
                     relations: ['listOptions'],
                  });
                  const arrayListOptionId = options.map((option) => {
                     return option.listOptions[0].id;
                  });


                  const account = await this.authService.findAccountById(user.id);
                  const addCart = await this.cartService.addProductToCart(
                     {
                        id: account.id,
                        email: account.email,
                        username: account.username,
                        roleName: account.role.name,
                     },
                     {
                        itemId: product.id,
                        quantity: Math.floor(Math.random() * 10) + 1,
                        listOptionId: arrayListOptionId,
                     },
                  );
               }
            }
         }
         console.log('CartSeeder: Done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
