import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { MessageEntity } from 'src/entities/chat';
import { MessageRepository } from 'src/repositories/chat';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService extends BaseService {
   constructor(@InjectRepository(MessageEntity) private messageRepository: MessageRepository) {
      super();
   }
   async create(createMessageDto: CreateMessageDto) {
      try {
         return await this.messageRepository.save(createMessageDto);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findByRoom(roomId: string) {
      try {
         return await this.messageRepository.find({
            where: {
               room: {
                  id: roomId,
               },
            },
            relations: ['room', 'account'],
            order: {
               createdAt: 'DESC',
            },
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
