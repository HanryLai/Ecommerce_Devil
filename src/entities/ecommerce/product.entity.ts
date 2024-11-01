import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, Table } from 'typeorm';
import { BaseEntity } from '../base';
import { AccountEntity } from '../auth';
import { FavoriteEntity } from './favorite.entity';
import { OptionEntity } from './option.entity';
import { IProductEntity } from '../interfaces';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity<ProductEntity> implements IProductEntity {
   @Column({ type: 'nvarchar' })
   name: string;

   @Column({ type: 'nvarchar' })
   description: string;

   @Column({ type: 'nvarchar', default: null })
   image_url: string;

   @Column({ type: 'double' })
   price: number;

   @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
   @JoinColumn()
   favorites: FavoriteEntity[];

   @OneToMany(() => OptionEntity, (option) => option.product)
   options: OptionEntity[];

   @ManyToMany(() => CategoryEntity)
   @JoinTable({ name: 'products_categories' })
   categories: CategoryEntity[];
}
