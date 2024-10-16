import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';

@Module({
   imports: [
      MulterModule.register({
         dest: '../../../assets/uploads',
      }),
   ],
   controllers: [CloudinaryController],
   providers: [CloudinaryService],
   exports: [CloudinaryService],
})
export class CloudinaryModule {}
