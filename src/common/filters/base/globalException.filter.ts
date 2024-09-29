import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { error } from 'console';
import { Response } from 'express';
import { BaseError } from 'src/common/base/baseError.base';

type ObjectResponse = {
   error: string;
   message: string;
};

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
   catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      let cause = '';
      let message = '';
      if (exception instanceof BaseError) {
         const objectError = exception.getResponse() as unknown as ObjectResponse;
         cause = objectError.error;
         message = objectError.message;
      }
      response.status(status).json({
         error: cause,
         message: message,
         statusCode: status,
         timestamp: new Date().toISOString(),
         path: request.url,
      });
   }
}
