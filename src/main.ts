import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   ConfigModule.forRoot({
      isGlobal: true,
   });

   app.setGlobalPrefix('api');

   const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   app.use(helmet());
   app.enableCors();
   await app.listen(process.env.PORT, () => {
      console.log('Server is running on port ' + process.env.PORT);
   });
}
bootstrap();
