import { Inject, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from 'src/common/guard';
import { AuthService } from '../auth';
import { JWTService } from '../auth/jwt';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room/room.service';
import { MessageService } from './message/message.service';
import { BaseService } from 'src/common/base';

@WebSocketGateway(6996, { cors: true })
export class ChatGateway
   extends BaseService
   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
   constructor(
      @Inject() private readonly authService: AuthService,
      @Inject() private readonly jwtService: JWTService,
      @Inject() private readonly RoomService: RoomService,
      @Inject() private readonly messageService: MessageService,
   ) {
      super();
   }
   private listAdminOnline: string[] = [];

   @WebSocketServer()
   server: Server;

   afterInit(socket: Socket) {
      console.log('afterInit');
   }

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
         console.log('decode', decoded);
         if (decoded.roleName === 'admin') {
            this.listAdminOnline.push(decoded.id);
         }
         console.log('listAdminOnline: ', this.listAdminOnline);
         client.emit('admins', { admins: this.listAdminOnline });
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
         console.log('listAdminOnline: ', this.listAdminOnline);
         console.log('handleDisconnect );' + client.id);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   determineRoomName(idUser: string, idOrder: string): string {
      try {
         console.log(idUser > idOrder ? `${idUser}SOCKET${idOrder}` : `${idOrder}SOCKET${idUser}`);
         return idUser > idOrder ? `${idUser}SOCKET${idOrder}` : `${idOrder}SOCKET${idUser}`;
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
         const idUser = await this.getToken(client);
         const foundUserCurrent = await this.authService.findAccountById(idUser.id);
         const foundUserOrder = await this.authService.findAccountById(data.userIdOrder);
         if (!foundUserCurrent || !foundUserOrder) {
            this.NotFoundException('User not found');
         }
         const roomName = this.determineRoomName(data.userIdOrder, idUser.id);
         const foundRoom = await this.RoomService.findOne(roomName);
         if (!foundRoom) {
            await this.RoomService.create({
               accounts: [foundUserCurrent, foundUserOrder],
               name: roomName,
            });
         }
         client.join(roomName);
         const listMessage = await this.messageService.findByRoomName(roomName);

         client.emit('joinedRoom', { roomName, message: 'Joined room successfully' });
         listMessage.forEach((message) => {
            client.emit('message', {
               message: message,
            });
         });
         this.server.to(roomName).emit('newMember', { message: `${client.id} joined the room` });
         console.log(`Client ${client.id} joined room: ${roomName}`);
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
         const idUser = await this.getToken(client);
         const foundAccount = await this.authService.findAccountById(idUser.id);
         if (!foundAccount) {
            this.NotFoundException('Account not found');
         }
         const roomName = this.determineRoomName(data.userIdOrder, idUser.id);
         const foundRoom = await this.RoomService.findOne(roomName);
         if (!foundRoom) {
            this.NotFoundException('Room not found');
         }
         await this.messageService.create({
            content: data.content,
            room: foundRoom,
            account: foundAccount,
         });
         console.log(`Received message: ${data.content} `);
         this.server.to(roomName).emit('message', data.content);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   handleConfirmRoom(room: string, client: Socket) {
      try {
         client.join(room);
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
