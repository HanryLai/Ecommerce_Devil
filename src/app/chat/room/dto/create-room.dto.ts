import { AccountEntity } from 'src/entities/auth';

export class CreateRoomDto {
   name: string;
   account: AccountEntity;
}
