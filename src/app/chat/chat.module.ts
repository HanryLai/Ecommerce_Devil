import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/auth';
import { AuthModule } from '../auth';
import { JWTModule } from '../auth/jwt';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { MessageEntity, RoomEntity } from 'src/entities/chat';

@Module({
   imports: [
      TypeOrmModule.forFeature([
         MessageEntity,
         RoomEntity,
         AccountEntity,
         MessageEntity,
         RoomEntity,
      ]),
      AuthModule,
      JWTModule,
      RoomModule,
      MessageModule,
   ],
   providers: [ChatGateway, ChatService],
})
export class ChatModule {}
