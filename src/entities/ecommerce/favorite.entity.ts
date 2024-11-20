import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { AccountEntity } from "../auth";

@Entity({name: 'favorite'})
export class FavoriteEntity{
   @PrimaryColumn()
   user_id: string;

   @PrimaryColumn()
   product_id: string;

   @CreateDateColumn()
   createdAt: Date;
   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(() => ProductEntity, product => product.favorites)
   @JoinColumn({name: 'product_id'})
   product: ProductEntity;

   @OneToOne(() => AccountEntity, account => account.favorite)
   @JoinColumn({name: 'user_id'})
   user: AccountEntity;

   
}