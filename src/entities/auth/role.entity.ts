import { Entity } from 'typeorm';
import { BaseEntity } from '../base';
import { IRoleEntity } from '../interfaces';

@Entity('role')
export class RoleEntity extends BaseEntity<RoleEntity> implements IRoleEntity {
   name: string;
   description: string;
}
