import { IBaseEntity } from './base.entities.interface';

export class IOptionEntity extends IBaseEntity {
   name: string;
   description: string;
   orderIndex: number;
}
