import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/auth';
import { JwtModule } from '@nestjs/jwt';

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
