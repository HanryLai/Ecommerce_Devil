import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/base';
import { WsAdapter } from '@nestjs/platform-ws';
async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);
   const port = configService.get<number>('PORT') || 9999;
   const hostname = configService.get<string>('HOST') || 'localhost';
   app.setGlobalPrefix('api');

   const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addBearerAuth({
         type: 'http',
         scheme: 'bearer',
         in: 'header',
      })
      .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
   app.use(helmet());
   app.enableCors();

   app.useGlobalFilters(new GlobalExceptionFilter());
   app.useGlobalPipes(new ValidationPipe());
   await app.listen(port, hostname, () => {
      console.log(
         '---------------------------------------------------------------------------\n',
      );
      console.log(
         '\x1b[42m Server is running\x1b[0m' +
            ' ' +
            '\x1b[42m' +
            hostname +
            '\x1b[0m' +
            ' ' +
            '\x1b[42m' +
            port +
            '\x1b[0m',
      );
      console.log(
         '\n---------------------------------------------------------------------------',
      );
   });
}
bootstrap();
