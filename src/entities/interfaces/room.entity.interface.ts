import { AccountEntity } from '../auth';

export interface IRoom {
   room_name: string;
   accounts: AccountEntity[];
}
