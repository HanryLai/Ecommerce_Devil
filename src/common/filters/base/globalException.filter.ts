import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

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

      if (exception) {
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
