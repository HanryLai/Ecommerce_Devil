import { MessageResponse } from './interfaces';

export class BaseController {
   protected createSuccessResponse(data: unknown, message?: string): MessageResponse {
      return {
         data: data,
         message: message ? message : 'Created successfully',
         statusCode: 201,
      };
   }

   protected OkResponse(data: unknown, message?: string): MessageResponse {
      return {
         data: data,
         message: message ? message : 'Updated successfully',
         statusCode: 200,
      };
   }
}
