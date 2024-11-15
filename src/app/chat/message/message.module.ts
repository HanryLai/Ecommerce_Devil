import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/chat';

@Module({
   imports: [TypeOrmModule.forFeature([MessageEntity])],
   controllers: [MessageController],
   providers: [MessageService],
   exports: [MessageService],
})
export class MessageModule {}
