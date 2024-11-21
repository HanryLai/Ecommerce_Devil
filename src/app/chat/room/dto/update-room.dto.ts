import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { AccountEntity } from 'src/entities/auth';

export class UpdateRoomDto {
   name: string;
   accounts: AccountEntity[];
}
