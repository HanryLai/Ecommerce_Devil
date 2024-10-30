import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base';
import { IOptionEntity } from '../interfaces/option.entity.interface';
import { ProductEntity } from './product.entity';

@Entity({ name: 'option' })
export class OptionEntity extends BaseEntity<OptionEntity> implements IOptionEntity {
   @Column({ type: 'varchar' })
   name: string;
   @Column({ type: 'varchar' })
   description: string;
   @Column({ type: 'int' })
   orderIndex: number;
   @ManyToOne(() => ProductEntity, (product) => product.option_id)
   chooseOptionId: string;
}
