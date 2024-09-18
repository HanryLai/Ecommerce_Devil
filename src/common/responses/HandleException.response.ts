import { HttpException, HttpStatus } from '@nestjs/common';

export class HandleException extends HttpException {
   public readonly message: string;
   public readonly statusCode: number;
   constructor(message: string, statusCode: number) {
      super(message, statusCode);
      (this.statusCode = statusCode), (this.message = message);
   }
   public errorMessage() {
      return {
         message: this.message,
         data: {},
         statusCode: this.statusCode,
         success: false,
      };
   }
}
