import { BaseError } from 'src/common/base';

export class CloudinaryError extends BaseError {
   constructor(http_code: number, error: string) {
      super('Cloudinary', http_code, error);
   }
}
