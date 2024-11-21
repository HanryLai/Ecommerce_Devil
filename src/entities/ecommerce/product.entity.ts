
import { CartItemEntity } from './cart_item.entity';
import { CategoryEntity } from './category.entity';
import { OptionEntity } from './option.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, Table } from 'typeorm';
import { BaseEntity } from '../base';
import { AccountEntity } from '../auth';
import { FavoriteEntity } from './favorite.entity';
import { FeedbackEntity } from './feedback.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity<ProductEntity> {
   @Column({ type: 'nvarchar' })
   name: string;

   @Column({ type: 'nvarchar' })
   description: string;

   @Column({ type: 'nvarchar', default: null })
   image_url: string;

   @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
   favorites: FavoriteEntity[];
   
   @Column({ type: 'nvarchar', default: null })
   option_id: string;

   @OneToMany(() => CartItemEntity, (cartItem) => cartItem.item)
   cart_items: CartItemEntity[];
   @Column({ type: 'double' })
   price: number;

   @ManyToMany(() => CategoryEntity)
   @JoinTable({ name: 'products_categories' })
   categories: CategoryEntity[];

   @OneToMany(() => OptionEntity, (option) => option.product)
   options: OptionEntity[];

   @OneToMany(() => FeedbackEntity, (feedback) => feedback.product)
   feedbacks: AccountEntity[];
}
