import { Inject } from '@nestjs/common';
import {
   ConnectedSocket,
   MessageBody,
   OnGatewayConnection,
   OnGatewayDisconnect,
   OnGatewayInit,
   SubscribeMessage,
   WebSocketGateway,
   WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BaseService } from 'src/common/base';
import { AuthService } from '../auth';
import { JWTService } from '../auth/jwt';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { MessageService } from './message/message.service';
import { RoomService } from './room/room.service';

@WebSocketGateway(6996, { cors: true })
export class ChatGateway extends BaseService implements OnGatewayConnection, OnGatewayDisconnect {
   constructor(
      @Inject() private readonly authService: AuthService,
      @Inject() private readonly jwtService: JWTService,
      @Inject() private readonly RoomService: RoomService,
      @Inject() private readonly messageService: MessageService,
   ) {
      super();
      this.listAdminOnline = [];
   }
   public listAdminOnline: string[];

   @WebSocketServer()
   server: Server;

   async getToken(client: Socket) {
      try {
         const token = client.handshake.headers.authorization;
         const decoded = await this.jwtService.verifyToken(token);
         return decoded;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async handleConnection(client: Socket) {
      try {
         const decoded = await this.getToken(client);
         if (decoded.roleName === 'admin') {
            this.listAdminOnline.push(decoded.id);
         }
         client.join('general');
         client.join(decoded.id);
         this.server.to('general').emit('admins', { admins: this.listAdminOnline });
      } catch (error) {
         this.ThrowError(error);
      }
   }
   async handleDisconnect(client: Socket) {
      try {
         const decoded = await this.getToken(client);
         if (decoded.roleName === 'admin') {
            this.listAdminOnline.splice(this.listAdminOnline.indexOf(decoded.id));
         }
         this.server.to('general').emit('admins', { admins: this.listAdminOnline });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   @SubscribeMessage('joinRoom')
   async handleJoinRoom(
      @MessageBody() data: CreateRoomDto,
      @ConnectedSocket() client: Socket,
   ): Promise<void> {
      try {
         const user = await this.getToken(client);
         const foundUserCurrent = await this.authService.findAccountById(user.id);
         let foundRoom =
            user.roleName === 'customer'
               ? await this.RoomService.findOneByOwner(user.id)
               : await this.RoomService.findOneByOwner(data.owner_id);
         console.log('foundRoom', foundRoom);
         if (!foundRoom && user.roleName === 'customer') {
            foundRoom = await this.RoomService.create({
               account: foundUserCurrent,
            });
         }
         if (!foundRoom) this.NotFoundException('Room not found');
         const roomName = foundRoom.account.id;

         // ERROR: ADMIN CAN'T JOIN ROOM WHEN USER IS NOT JOIN SOCKET
         if (user.roleName === 'admin') {
            const quantityMember = this.server.sockets.adapter.rooms.get(roomName)?.size || 0;
            if (quantityMember >= 2) {
               console.log('Room is full');
               client.emit('error', { message: 'Room is full' });
               return;
            }
         }

         const listMessage = await this.messageService.findByRoom(foundRoom.id);
         console.log('roomName', roomName);
         client.join(roomName);
         client.emit('joined', { roomName, message: 'Joined room successfully' });

         client.emit('oldMessages', {
            messages: listMessage,
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   @SubscribeMessage('message')
   async handleMessage(
      @MessageBody() data: CreateChatDto,
      @ConnectedSocket() client: Socket,
   ): Promise<void> {
      try {
         const user = await this.getToken(client);
         const foundAccount = await this.authService.findAccountById(user.id);
         let roomName = '';
         if (user.roleName === 'customer') roomName = user.id;
         if (user.roleName === 'admin') {
            const foundRoom = await this.RoomService.findOneByOwner(data.owner_id);
            if (!foundRoom) {
               this.NotFoundException('Room not found');
            }
            console.log('admin join room');
            roomName = foundRoom.account.id;
         }
         const foundRoom = await this.RoomService.findOneByOwner(roomName);
         if (!foundRoom) {
            this.NotFoundException('Room not found');
         }
         if (client.rooms.has(roomName)) {
            await this.messageService.create({
               content: data.content,
               room: foundRoom,
               account: foundAccount,
            });
            console.log(`Received message: ${data.content} `);
            this.server.to(roomName).emit('message', {
               message: data.content,
               sender: foundAccount,
            });
         }
      } catch (error) {
         this.ThrowError(error);
      }
   }

   @SubscribeMessage('leaveRoom')
   async handleLeaveRoom(
      @MessageBody() data: CreateRoomDto,
      @ConnectedSocket() client: Socket,
   ): Promise<void> {
      try {
         const user = await this.getToken(client);
         console.log("A User  LEave")
         let roomName = '';
         if (user.roleName === 'customer') roomName = user.id;
         if (user.roleName === 'admin') {
            const foundRoom = await this.RoomService.findOneByOwner(data.owner_id);
            if (!foundRoom) {
               this.NotFoundException('Room not found');
            }
            roomName = foundRoom.account.id;
         }
         const getCountMember = this.server.sockets.adapter.rooms.get(roomName)?.size || 0;
         const roomMemberCount = new Map<string, number>();

         // Giảm số lượng thành viên và cập nhật biến
         roomMemberCount.set(roomName, Math.max(0, getCountMember - 2));
         client.leave(roomName);
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
