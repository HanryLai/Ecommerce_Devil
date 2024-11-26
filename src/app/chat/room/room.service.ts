import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { MessageRepository, RoomRepository } from 'src/repositories/chat';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity, RoomEntity } from 'src/entities/chat';
import { BaseService } from 'src/common/base';
import { In } from 'typeorm';
import { AuthService } from 'src/app/auth';
import { CurrentUserDto } from 'src/common/interceptor';

@Injectable()
export class RoomService extends BaseService {
   constructor(
      @InjectRepository(RoomEntity) private readonly roomRepository: RoomRepository,
      @InjectRepository(MessageEntity) private readonly messageRepository: MessageRepository,
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
         const rooms = await this.roomRepository.find({
            relations: ['account.detailInformation'],
         });
         if (!rooms) {
            this.NotFoundException('Rooms not found');
         }
         if (rooms.length === 0) {
            return [];
         }

         let result: {
            roomId: string;
            userId: string;
            avatar: string;
            name: string;
            lastMessage: {
               message: string;
               senderId: string;
            };
         }[] = [];

         for (const room of rooms) {
            const messages = await this.messageRepository.find({
               where: {
                  room: {
                     id: room.id,
                  },
               },
               order: {
                  createdAt: 'DESC',
               },
               take: 1,
               relations: ['account'],
            });

            if (messages.length > 0) {
               result.push({
                  roomId: room.id,
                  userId: room.account.id,
                  avatar: room.account.detailInformation.avatar_url,
                  name: room.account.detailInformation.full_name,
                  lastMessage: {
                     message: messages[0].content,
                     senderId: messages[0].account.id,
                  },
               });
            } else {
               result.push({
                  roomId: room.id,
                  userId: room.account.id,
                  avatar: room.account.detailInformation.avatar_url,
                  name: room.account.detailInformation.full_name,
                  lastMessage: {
                     message: '',
                     senderId: '',
                  },
               });
            }
         }

         return result;
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
