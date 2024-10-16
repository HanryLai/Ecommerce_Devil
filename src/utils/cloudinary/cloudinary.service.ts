import { Injectable } from '@nestjs/common';
import { DeleteApiResponse, UploadApiResponse, v2 } from 'cloudinary';
import { BaseService } from 'src/common/base';
import { GetResourceOption, UploadCloudOption } from './types';
@Injectable()
export class CloudinaryService extends BaseService {
   constructor() {
      super();
      v2.config({
         api_key: process.env.API_KEY,
         api_secret: process.env.API_SECRET,
         cloud_name: process.env.CLOUD_NAME,
         secure: true,
      });
   }

   public getConfig() {
      console.log(v2.config());
      return v2.config();
   }

   public async getFile(
      publicId: string,
      option?: GetResourceOption,
   ): Promise<Express.Multer.File> {
      try {
         if (!publicId) this.BadRequestException('Public id not valid');
         const DecodePublicId = decodeURIComponent(publicId);
         const foundFile = await v2.api.resource(DecodePublicId, {
            ...option,
         });
         if (!foundFile) this.NotFoundException('Not found this image');
         return foundFile;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async getFilesList(
      publicIds: string[],
      option?: GetResourceOption,
   ): Promise<Array<Express.Multer.File>> {
      try {
         if (!publicIds) this.BadRequestException('Public ids list not valid');
         const foundFilesSync = publicIds.map((id) =>
            v2.api.resources({
               ...option,
               public_ids: publicIds,
            }),
         );
         const foundFiles = await Promise.all(foundFilesSync);

         if (!foundFiles) this.NotFoundException('Not found this image');
         return foundFiles;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async uploadFile(
      file: Express.Multer.File,
      option?: UploadCloudOption,
   ): Promise<UploadApiResponse> {
      try {
         if (!file) this.BadRequestException('File not found');
         const filePath = file.path;
         const result = await v2.uploader.upload(filePath, {
            folder: 'e-commerce',
            ...option,
         });
         if (!result) this.ExpectationFailedException('Upload multiple file to cloud failed');
         return result;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async uploadMultipleFile(
      filesList: Array<Express.Multer.File>,
      option?: UploadCloudOption,
   ): Promise<Array<UploadApiResponse>> {
      try {
         if (!filesList) this.BadRequestException('Files list not valid or empty');
         const listFileSync = await Promise.all(
            filesList.map((file) => {
               return v2.uploader.upload(file.path, {
                  folder: 'e-commerce',
                  ...option,
               });
            }),
         );
         const result = Promise.all(listFileSync);
         return result;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async updateFile(
      fileUpdate: Express.Multer.File,
      public_id: string,
      option?: UploadCloudOption,
   ): Promise<UploadApiResponse> {
      try {
         if (!fileUpdate || !public_id)
            this.BadRequestException('File update or public id invalid ');
         public_id = decodeURIComponent(public_id);
         const result = await v2.uploader.upload(fileUpdate.path, {
            ...option,
            public_id: public_id,
            overwrite: true,
            invalidate: true,
         });
         if (!result) this.BadRequestException('Update file on cloud have error');
         return result;
      } catch (error) {}
   }

   public async updateMultipleFile(
      filesUpdate: Array<Express.Multer.File>,
      publicIdsList: string[],
      option?: UploadCloudOption,
   ): Promise<Array<UploadApiResponse>> {
      try {
         if (!filesUpdate.length) this.BadRequestException('List files are null');
         const resultSync = filesUpdate.map((file, index) => {
            return v2.uploader.upload(file.path, {
               ...option,
               public_id: publicIdsList[index],
               overwrite: true,
               invalidate: true,
            });
         });
         const result = await Promise.all(resultSync);
         if (!result) this.BadRequestException('Update files on cloud have error');
         return result;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async deleteFile(publicId: string): Promise<Record<string, string>> {
      try {
         if (!publicId) this.BadGatewayException('public id invalid');
         const result = await v2.uploader.destroy(publicId, {
            invalidate: true,
         });
         return result;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async deleteMultipleFiles(publicIds: string[]): Promise<DeleteApiResponse> {
      try {
         if (!publicIds) this.BadGatewayException('List public ids invalid ');
         const result = await v2.api.delete_resources(publicIds);
         if (!result) this.BadRequestException('Cloud delete failed');
         return result;
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
