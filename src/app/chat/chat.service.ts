import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { ChatGateway } from './chat.gateway';
import { RoomService } from './room/room.service';
import { MessageService } from './message/message.service';

@Injectable()
export class ChatService extends BaseService {
   constructor() {
      super();
   }
}
