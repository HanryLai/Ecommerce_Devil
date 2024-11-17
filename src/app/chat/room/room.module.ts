import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/chat';

@Module({
   imports: [TypeOrmModule.forFeature([RoomEntity])],
   //  controllers: [],
   providers: [RoomService],
   exports: [RoomService],
})
export class RoomModule {}
