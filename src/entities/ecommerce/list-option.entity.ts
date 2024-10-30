import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base';
import { IListOptionEntity } from '../interfaces';

@Entity({ name: 'option' })
export class ListOptionEntity extends BaseEntity<ListOptionEntity> implements IListOptionEntity {
   @Column({ type: 'varchar' })
   name: string;
   @Column({ type: 'varchar' })
   description: string;
   @Column({ type: 'int' })
   orderIndex: number;
   @Column({ type: 'double' })
   adjustPrice: number;
   @Column({ type: 'int' })
   quantity: number;
}
