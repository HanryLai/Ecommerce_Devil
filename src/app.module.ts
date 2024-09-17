import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { DatabaseModule } from './common/database';
import { RoleModule } from './app/role/role.module';

@Module({
   imports: [DatabaseModule, AuthModule, RoleModule],
   controllers: [],
   providers: [],
})
export class AppModule {}
