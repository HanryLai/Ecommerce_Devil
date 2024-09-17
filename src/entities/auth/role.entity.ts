import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base';
import { IRoleEntity } from '../interfaces';

@Entity('role')
export class RoleEntity extends BaseEntity<RoleEntity> implements IRoleEntity {
   @Column({ type: 'varchar' })
   name: string;
   @Column({ type: 'varchar' })
   description: string;
}
