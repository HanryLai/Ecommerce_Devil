import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
               host: config.get<string>('DATABASE_HOST'),
               port: config.get<number>('DATABASE_PORT'),
               username: config.get<string>('DATABASE_USER'),
               password: config.get<string>('DATABASE_PASSWORD'),
               database: config.get<string>('DATABASE_NAME'),
               autoLoadEntities: true,
               synchronize: true,
               dropSchema: false,
               entities: entities,
            };
         },
      }),
   ],
   providers: [],
   exports: [],
})
export class DatabaseModule {}
