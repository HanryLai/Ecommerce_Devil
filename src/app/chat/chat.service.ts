import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity, MessageEntity } from 'src/entities/chat';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/entities/auth';
import { CurrentUserDto } from 'src/common/interceptor';

@Injectable()
export class ChatService {
   constructor(
      @InjectRepository(ChatEntity)
      private chatRepository: Repository<ChatEntity>,

      @InjectRepository(MessageEntity)
      private messageRepository: Repository<MessageEntity>,

      @InjectRepository(AccountEntity)
      private accountRepository: Repository<AccountEntity>,
   ) {}

}
