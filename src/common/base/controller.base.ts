import { HttpStatus } from '@nestjs/common';
import { MessageResponse } from './MessageResponse.interface.response';

export class BaseController {
   protected createSuccessResponse(
      data: any,
      statusCode?: number | 200,
      message?: string,
   ): MessageResponse {
      return {
         success: true,
         data,
         statusCode: statusCode,
         message: message ? message : 'Success',
      };
   }
}
