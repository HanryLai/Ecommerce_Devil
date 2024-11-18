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
   cart_id: string;

   @PrimaryColumn()
   item_id: string;

   @Column({ type: 'int' })
   quantity: number;

   @ManyToOne(() => ShoppingCartEntity, (shoppingCart) => shoppingCart.cart_items)
   @JoinColumn({ name: 'cart_id' })
   cart: ShoppingCartEntity;

   @ManyToOne(() => ProductEntity, (product) => product.cart_items)
   @JoinColumn({ name: 'item_id' })
   item: ProductEntity;

   @OneToMany(() => OptionCart, (option) => option.cart_items)
   options: OptionCart[];
}
