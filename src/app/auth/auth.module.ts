import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/auth/account.entity';
import { RoleModule } from '../role/role.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTModule } from './jwt/jwt.module';

@Module({
   imports: [TypeOrmModule.forFeature([AccountEntity]), RoleModule, JWTModule],
   controllers: [AuthController],
   providers: [AuthService],
   exports: [AuthService],
})
export class AuthModule {}
