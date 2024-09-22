import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base';
import { IRoleEntity } from '../interfaces';
import { AccountEntity } from './account.entity';

@Entity('role')
export class RoleEntity extends BaseEntity<RoleEntity> implements IRoleEntity {
   @Column({ type: 'varchar' })
   name: string;
   @Column({ type: 'varchar' })
   description: string;

   @OneToMany(() => AccountEntity, (account) => account.role)
   accounts: AccountEntity[];
}
