import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AccountEntity } from 'src/entities/auth/account.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([AccountEntity]),
      // JwtModule.registerAsync({
      //    useFactory: async () => ({}),
      // }),
      JwtModule,
   ],
   controllers: [AuthController],
   providers: [AuthService],
})
export class AuthModule {}
