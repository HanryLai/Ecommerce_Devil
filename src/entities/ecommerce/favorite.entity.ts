import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "../base";
import { ProductEntity } from "./product.entity";
import { AccountEntity } from "../auth";

@Entity({name: 'favorites'})
export class FavoriteEntity {
   @PrimaryColumn()
   userId: string;

   @PrimaryColumn()
   productId: string;

   @CreateDateColumn()
   createdAt: Date;
   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(() => ProductEntity, product => product.favorites)
   @JoinColumn({name: 'productId'})
   product: ProductEntity;

   @OneToOne(() => AccountEntity, account => account.favorite)
   @JoinColumn({name: 'userId'})
   user: AccountEntity;

   
}