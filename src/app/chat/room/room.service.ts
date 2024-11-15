import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from 'src/repositories/chat';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/chat';
import { BaseService } from 'src/common/base';

@Injectable()
export class RoomService extends BaseService {
   constructor(@InjectRepository(RoomEntity) private readonly roomRepository: RoomRepository) {
      super();
   }

   async create(createRoomDto: CreateRoomDto) {
      return await this.roomRepository.save({
         room_name: createRoomDto.name,
         accounts: [createRoomDto.account],
      });
   }

   async findAll() {
      return await this.roomRepository.find();
   }

   async findOne(name: string) {
      return await this.roomRepository.findOne({
         where: {
            room_name: name,
         },
      });
   }

   async update(updateRoomDto: UpdateRoomDto) {
      const foundRoom = await this.roomRepository.findOne({
         where: { room_name: updateRoomDto.name },
      });
      return this.roomRepository.update(foundRoom.id, {
         accounts: [...foundRoom.accounts, ...updateRoomDto.accounts],
      });
   }

   //  remove(id: number) {
   //     return `This action removes a #${id} room`;
   //  }
}
