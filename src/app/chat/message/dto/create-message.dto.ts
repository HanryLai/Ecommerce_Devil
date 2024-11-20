import { AccountEntity } from 'src/entities/auth';
import { RoomEntity } from 'src/entities/chat';
import { IMessage } from 'src/entities/interfaces/message.entity.interface';

export class CreateMessageDto implements IMessage {
   account: AccountEntity;
   room: RoomEntity;
   content: string;
}
