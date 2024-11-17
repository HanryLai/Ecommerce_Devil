import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/chat';
import { AccountEntity } from 'src/entities/auth';
import { AuthModule } from 'src/app/auth';

@Module({
   imports: [TypeOrmModule.forFeature([RoomEntity, AccountEntity]), AuthModule],
   providers: [RoomService],
   exports: [RoomService],
})
export class RoomModule {}
