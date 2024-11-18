import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryColumn,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ShoppingCartEntity } from './shopping_cart.entity';
import { OptionCart } from './option_cart.entity';

@Entity({ name: 'cart_item' })
export class CartItemEntity {
   @PrimaryColumn()
   cartId: string;

   @PrimaryColumn()
   itemId: string;

   @Column({ type: 'int' })
   quantity: number;

   @ManyToOne(() => ShoppingCartEntity, (shoppingCart) => shoppingCart.cartItems)
   @JoinColumn({ name: 'cartId' })
   cart: ShoppingCartEntity;

   @ManyToOne(() => ProductEntity, (product) => product.cartItem)
   @JoinColumn({ name: 'itemId' })
   item: ProductEntity;

   @OneToMany(() => OptionCart, (option) => option.cartItems)
   options: OptionCart[];
}
