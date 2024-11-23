import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base';
import { IListOptionEntity } from '../interfaces';
import { OptionEntity } from './option.entity';
import { OptionCartEntity } from './option_cart.entity';

@Entity({ name: 'list_option' })
export class ListOptionEntity extends BaseEntity<ListOptionEntity> implements IListOptionEntity {
   @Column({ type: 'varchar' })
   name: string;

   @Column({ type: 'varchar' })
   description: string;

   @Column({ type: 'int' })
   orderIndex: number;

   @Column({ name: 'adjust_price', type: 'double' })
   adjustPrice: number;

   @Column({ type: 'int' })
   quantity: number;

   @ManyToOne(() => OptionEntity, (option) => option.listOptions)
   option: OptionEntity;

   @OneToMany(() => OptionCartEntity, (optionCart) => optionCart.listOption)
   optionCart: OptionCartEntity[];
}
