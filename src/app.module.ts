import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './common/database';
import { AccountEntity, RoleEntity } from './entities/auth';
import { LoggerMiddleware } from './middleware';
import { AdminSeeder, ProductSeeder, RoleSeeder } from './seeders';
import { AuthModule } from './app/auth';
import { RoleModule } from './app/role';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import { ProductModule } from './app/product/product.module';
import { EmailModule } from './utils/email/email.module';
import { FavoriteModule } from './app/favorite/favorite.module';
import { FavoriteEntity, ProductEntity } from './entities/ecommerce';
import { RunAllSeeder } from './seeders/run.seeder';

@Module({
   imports: [
      TypeOrmModule.forFeature([RoleEntity, AccountEntity, ProductEntity, FavoriteEntity]),
      DatabaseModule,
      AuthModule,
      RoleModule,
      CloudinaryModule,
      ProductModule,
      EmailModule,
      FavoriteModule,
   ],
   providers: [RunAllSeeder, RoleSeeder, AdminSeeder, ProductSeeder, FavoriteSeeder],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
   }
}
