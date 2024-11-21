import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base';
import { ICategoryEntity } from '../interfaces/category.entity.interface';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity<CategoryEntity> implements ICategoryEntity {
   @Column({ type: 'varchar' })
   title: string;
   @Column({ type: 'varchar' })
   image: string;
   @Column({ type: 'varchar' })
   description: string;
}
