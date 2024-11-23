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
            account: createRoomDto.account,
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findAll(user: CurrentUserDto) {
      try {
         const foundAdmin = await this.authService.findAccountById(user.id);
         if (!foundAdmin || foundAdmin.role.name != 'admin') {
            this.ThrowError('Admin not found');
         }
         const rooms = await this.roomRepository.find();
         if (rooms.length == 0) {
            this.NotFoundException('Rooms not found');
         }

         return rooms;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   // async findOneByOwnerId(idOwner: string) {
   //    try {
   //       return await this.roomRepository.findOne({
   //          where: {
   //             account: {
   //                id: idOwner,
   //             },
   //          },
   //          relations: ['account'],
   //       });
   //    } catch (error) {
   //       this.ThrowError(error);
   //    }
   // }

   async findOneByOwner(idOwner: string): Promise<RoomEntity> {
      try {
         if (!idOwner) {
            this.BadRequestException('Id owner is required');
         }
         return await this.roomRepository.findOne({
            where: {
               account: {
                  id: idOwner,
                  role: {
                     name: 'customer',
                  },
               },
            },
            relations: ['account', 'account.role'],
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   //  remove(id: number) {
   //     return `This action removes a #${id} room`;
   //  }
}
