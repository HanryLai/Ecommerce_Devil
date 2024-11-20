import { AccountEntity } from '../auth';
import { RoomEntity } from '../chat';

export interface IMessage {
   content: string;
   account: AccountEntity;
   room: RoomEntity;
}
