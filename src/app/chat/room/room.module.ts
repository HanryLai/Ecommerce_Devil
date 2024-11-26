import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/auth';
import { JWTModule } from 'src/app/auth/jwt';
import { AccountEntity } from 'src/entities/auth';
import { MessageEntity, RoomEntity } from 'src/entities/chat';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
   imports: [TypeOrmModule.forFeature([RoomEntity, AccountEntity, MessageEntity]), AuthModule, JWTModule],
   controllers: [RoomController],
   providers: [RoomService],
   exports: [RoomService],
})
export class RoomModule {}
