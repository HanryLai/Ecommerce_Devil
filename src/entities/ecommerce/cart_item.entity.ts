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
import { OptionCartEntity,  } from './option_cart.entity';
import { BaseEntity } from '../base';

@Entity({ name: 'cart_item' })
export class CartItemEntity extends BaseEntity<CartItemEntity> {
   @Column({ type: 'int' })
   quantity: number;

   @ManyToOne(() => ShoppingCartEntity, (shoppingCart) => shoppingCart.cartItems)
   @JoinColumn({ name: 'cart_id' })
   cart: ShoppingCartEntity;

   @ManyToOne(() => ProductEntity, (product) => product.cart_items)
   @JoinColumn({ name: 'item_id' })
   item: ProductEntity;

   @OneToMany(() => OptionCartEntity, (option) => option.cartItems)
   options: OptionCartEntity[];
}
