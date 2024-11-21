import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base';
import { IOptionEntity } from '../interfaces/option.entity.interface';
import { ProductEntity } from './product.entity';
import { ListOptionEntity } from './list-option.entity';

@Entity({ name: 'option' })
export class OptionEntity extends BaseEntity<OptionEntity> implements IOptionEntity {
   @Column({ type: 'varchar' })
   name: string;

   @Column({ type: 'varchar' })
   description: string;

   @Column({ type: 'int' })
   orderIndex: number;

   @ManyToOne(() => ProductEntity, (product) => product.options)
   @JoinColumn({ name: 'product_id' })
   product: ProductEntity;

   @OneToMany(() => ListOptionEntity, (listOption) => listOption.option)
   listOptions: ListOptionEntity[];
}
