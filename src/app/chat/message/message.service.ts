import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/chat';
import { MessageRepository } from 'src/repositories/chat';
import { BaseService } from 'src/common/base';

@Injectable()
export class MessageService extends BaseService {
   constructor(@InjectRepository(MessageEntity) private messageRepository: MessageRepository) {
      super();
   }
   async create(createMessageDto: CreateMessageDto) {
      return await this.messageRepository.save(createMessageDto);
   }

   async findByRoomName(room_name: string) {
      return await this.messageRepository.find({
         where: {
            room: {
               room_name: room_name,
            },
         },
      });
   }
}
