import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { MessageResponse } from '../responses/MessageResponse.interface.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
   catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const messageResponse = {
         message: exception.message,
         statusCode: status,
         success: false,
         data: {},
      };
      response.status(status).json(messageResponse);
   }
}
