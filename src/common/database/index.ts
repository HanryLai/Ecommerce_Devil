import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { entities } from 'src/entities';
@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: `.env.${process.env.NODE_ENV}`,
      }),
      TypeOrmModule.forRootAsync({
         inject: [ConfigService],
         useFactory: (config: ConfigService) => {
            return {
               type: 'mysql',
               host: config.get<string>('POSTGRES_HOST'),
               port: config.get<number>('POSTGRES_PORT'),
               username: config.get<string>('POSTGRES_USER'),
               password: config.get<string>('POSTGRES_PASSWORD'),
               database: config.get<string>('POSTGRES_DB'),
               autoLoadEntities: true,
               synchronize: true,
               entities: entities,
            };
         },
      }),
   ],
   providers: [],
   exports: [],
})
export class DatabaseModule {}
