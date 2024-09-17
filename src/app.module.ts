import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { RoleModule } from './app/role/role.module';
import { DatabaseModule } from './common/database';
import { RoleEntity } from './entities/auth';
import { RoleSeeder } from './seeders/role.service.seeder';

@Module({
   imports: [TypeOrmModule.forFeature([RoleEntity]), DatabaseModule, AuthModule, RoleModule],
   providers: [RoleSeeder],
})
export class AppModule {}
