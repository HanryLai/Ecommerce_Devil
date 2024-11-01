import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/entities/ecommerce';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [TypeOrmModule.forFeature([FavoriteEntity]), JWTModule],
   controllers: [FavoriteController],
   providers: [FavoriteService],
})
export class FavoriteModule {}
