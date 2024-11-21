import { IBaseEntity } from './baseEntity.interface';

export interface IDetailInformationEntity extends IBaseEntity {
   phone: string;
   full_name: string;
   address: string;
   avatar_url: string;
}
