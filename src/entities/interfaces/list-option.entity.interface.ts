import { IBaseEntity } from './base.entities.interface';

export class IListOptionEntity extends IBaseEntity {
   name: string;
   description: string;
   orderIndex: number;
   adjustPrice: number;
   quantity: number;
}
