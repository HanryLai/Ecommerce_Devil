import {
   Column,
   Entity,
   JoinColumn,
   JoinTable,
   ManyToMany,
   ManyToOne,
   OneToMany,
   Table,
} from 'typeorm';
import { BaseEntity } from '../base';
import { FavoriteEntity } from './favorite.entity';
import { CartItemEntity } from './cart_item.entity';
import { CategoryEntity } from './category.entity';
import { OptionEntity } from './option.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity<ProductEntity> {
   @Column({ type: 'nvarchar' })
   name: string;

   @Column({ type: 'nvarchar' })
   description: string;

   @Column({ type: 'nvarchar', default: null })
   image_url: string;

   @Column({ type: 'double' })
   price: number;

   @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
   favorites: FavoriteEntity[];

   @OneToMany(() => CartItemEntity, (cartItem) => cartItem.item)
   cart_items: CartItemEntity[];

   @ManyToMany(() => CategoryEntity)
   @JoinTable({ name: 'products_categories' })
   categories: CategoryEntity[];

   @OneToMany(() => OptionEntity, (option) => option.product)
   options: OptionEntity[];
}
