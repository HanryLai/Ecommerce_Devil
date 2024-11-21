import { IBaseEntity } from './base.entities.interface';

export class ICategoryEntity extends IBaseEntity {
   title: string;
   image: string;
   description: string;
}
