import { Column, Entity, JoinColumn, ManyToMany, OneToMany, Table } from 'typeorm';
import { BaseEntity } from '../base';
import { AccountEntity } from '../auth';
import { FavoriteEntity } from './favorite.entity';

<<<<<<< HEAD
@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity<ProductEntity> {
   @Column({ type: 'nvarchar' })
   name: string;
=======
@Entity({name: 'product'})
export class ProductEntity extends BaseEntity<ProductEntity>{
    @Column({ type: 'nvarchar' })
    name: string;
>>>>>>> origin/main

   @Column({ type: 'nvarchar' })
   description: string;

   @Column({ type: 'nvarchar', default: null })
   categories: string;

   @Column({ type: 'nvarchar', default: null })
   image_url: string;

   @Column({ type: 'nvarchar', default: null })
   option_id: string;

   @Column({ type: 'double' })
   price: number;

   @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
   @JoinColumn()
   favorites: FavoriteEntity[];
}
