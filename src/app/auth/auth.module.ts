import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/auth/account.entity';
import { RoleModule } from '../role/role.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTModule } from './jwt/jwt.module';
import { CloudinaryModule } from '../../utils/cloudinary/cloudinary.module';
import { EmailModule } from 'src/utils/email/email.module';
import { CartModule } from '../cart/cart.module';
import { RoomModule } from '../chat/room/room.module';
import { RoomEntity } from '@/entities/chat';

@Module({
   imports: [
      TypeOrmModule.forFeature([AccountEntity, RoomEntity]),
      RoleModule,
      JWTModule,
      CloudinaryModule,
      EmailModule,
      CartModule,
   ],
   controllers: [AuthController],
   providers: [AuthService],
   exports: [AuthService],
})
export class AuthModule {}
