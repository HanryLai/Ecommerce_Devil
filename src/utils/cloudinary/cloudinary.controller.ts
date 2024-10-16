import {
   Body,
   Controller,
   Delete,
   Get,
   Inject,
   Param,
   Post,
   Put,
   UploadedFile,
   UploadedFiles,
   UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { BaseController } from 'src/common/base';

@Controller('cloud')
export class CloudinaryController extends BaseController {
   constructor(@Inject() private readonly cloudinaryService: CloudinaryService) {
      super();
   }
   @Get('test')
   UploadImage() {
      return this.cloudinaryService.getConfig();
   }

   @Get(':id')
   public async getFileById(@Param('id') id: string) {
      return await this.cloudinaryService.getFile(id);
   }

   @Post('upload-file')
   @UseInterceptors(FileInterceptor('file'))
   public async uploadImage(@UploadedFile() file: Express.Multer.File) {
      return this.OkResponse(await this.cloudinaryService.uploadFile(file));
   }

   @Post('upload-multiple-files')
   @UseInterceptors(FilesInterceptor('file'))
   public async uploadMultipleImage(@UploadedFiles() files: Array<Express.Multer.File>) {
      return await this.cloudinaryService.uploadMultipleFile(files);
   }

   @Put('update-file')
   @UseInterceptors(FileInterceptor('file'))
   public async updateImage(
      @UploadedFile() file: Express.Multer.File,
      @Body('public_id') publicId: string,
   ) {
      return await this.cloudinaryService.updateFile(file, publicId);
   }

   @Put('update-multiple-files')
   @UseInterceptors(FilesInterceptor('file'))
   public async updateMultipleImage(
      @UploadedFiles() files: Array<Express.Multer.File>,
      @Body() data: any,
   ) {
      return await this.cloudinaryService.updateMultipleFile(files, data.publicIds);
   }

   @Delete('delete-file')
   public async deleteImage(@Body('id') id: string) {
      return await this.cloudinaryService.deleteFile(id);
   }

   @Delete('delete-multiple-files')
   public async deleteMultipleImage(@Body('idsList') idsList: string[]) {
      return await this.cloudinaryService.deleteMultipleFiles(idsList);
   }
}
