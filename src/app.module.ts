import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { DatabaseModule } from './common/database';

@Module({
   imports: [DatabaseModule, AuthModule],
   controllers: [],
   providers: [],
})
export class AppModule {}
