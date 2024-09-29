import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './common/database';
import { RoleEntity } from './entities/auth';
import { LoggerMiddleware } from './middleware';
import { RoleSeeder } from './seeders';
import { AuthModule } from './app/auth';
import { RoleModule } from './app/role';

@Module({
   imports: [TypeOrmModule.forFeature([RoleEntity]), DatabaseModule, AuthModule, RoleModule],
   providers: [RoleSeeder],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
   }
}
