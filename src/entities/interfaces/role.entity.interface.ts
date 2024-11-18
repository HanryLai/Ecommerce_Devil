import { IBaseEntity } from './base.entities.interface';

export interface IRoleEntity extends IBaseEntity {
   name: string;
   description: string;
}
