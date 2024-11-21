import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { CartItemEntity } from './cart_item.entity';
import { ListOptionEntity } from './list-option.entity';
import { BaseEntity } from '../base';

@Entity({ name: 'option_cart' })
export class OptionCartEntity extends BaseEntity<OptionCartEntity> {
   @Column({name: 'list_option_id'})
   listOptionId: string;

   @Column({name: 'cart_item_id'})
   cartItemId: string;

   @ManyToOne(() => CartItemEntity, (cartItem) => cartItem.cart)
   @JoinColumn({ name: 'cart_item_id' })
   cartItems: CartItemEntity;

   @ManyToOne(() => ListOptionEntity, (listOption) => listOption.optionCart)
   @JoinColumn({ name: 'list_option_id' })
   listOption: ListOptionEntity;
}
