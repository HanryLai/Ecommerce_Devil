import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { CartItemEntity } from './cart_item.entity';

@Entity({ name: 'option_cart' })
export class OptionCart {
   @PrimaryColumn()
   id: string;

   @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
   cart_items: CartItemEntity[];
}
