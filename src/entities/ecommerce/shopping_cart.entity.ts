import { extend } from "joi";
import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../base";
import { AccountEntity } from "../auth";
import { CartItemEntity } from "./cart_item.entity";

@Entity({name: 'shopping_cart'})
export class ShoppingCartEntity extends BaseEntity<ShoppingCartEntity>{
    
    @OneToOne(() => AccountEntity)
    @JoinColumn()
    account: AccountEntity;

    @OneToMany(() => CartItemEntity, cartItem => cartItem.cart)
    cartItems: CartItemEntity[];


}