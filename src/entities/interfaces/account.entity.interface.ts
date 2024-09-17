import { IBaseEntity } from './base.entities.interface';

export class IAccountEntity extends IBaseEntity {
   email: string;
   username: string;
   password: string;
   isVerify: boolean;
   isActive: boolean;
   accessToken: string;
   refreshToken: string;
}
