import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './common/database';
import { AccountEntity, RoleEntity } from './entities/auth';
import { LoggerMiddleware } from './middleware';
import { AdminSeeder, RoleSeeder } from './seeders';
import { AuthModule } from './app/auth';
import { RoleModule } from './app/role';

@Module({
   imports: [
      TypeOrmModule.forFeature([RoleEntity, AccountEntity]),
      DatabaseModule,
      AuthModule,
      RoleModule,
   ],
   providers: [RoleSeeder, AdminSeeder],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
   }
}
