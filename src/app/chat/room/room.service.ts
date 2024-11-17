import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from 'src/repositories/chat';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/entities/chat';
import { BaseService } from 'src/common/base';
import { In } from 'typeorm';
import { AuthService } from 'src/app/auth';
import { CurrentUserDto } from 'src/common/interceptor';

@Injectable()
export class RoomService extends BaseService {
   constructor(
      @InjectRepository(RoomEntity) private readonly roomRepository: RoomRepository,
      @Inject() private readonly authService: AuthService,
   ) {
      super();
   }

   async create(createRoomDto: CreateRoomDto) {
      try {
         return await this.roomRepository.save({
            room_name: createRoomDto.name,
            accounts: [...createRoomDto.accounts],
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findAllByAdmin(user: CurrentUserDto) {
      try {
         const foundAdmin = await this.authService.findAccountById(user.id);
         if (!foundAdmin || foundAdmin.role.name != 'admin') {
            this.ThrowError('Admin not found');
         }
         console.log('room', foundAdmin.rooms);
         const rooms = foundAdmin.rooms;
         return rooms;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findOne(name: string) {
      try {
         return await this.roomRepository.findOne({
            where: {
               room_name: name,
            },
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async update(updateRoomDto: UpdateRoomDto) {
      try {
         const foundRoom = await this.roomRepository.findOne({
            where: { room_name: updateRoomDto.name },
         });
         return this.roomRepository.update(foundRoom.id, {
            accounts: [...foundRoom.accounts, ...updateRoomDto.accounts],
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   //  remove(id: number) {
   //     return `This action removes a #${id} room`;
   //  }
}
