import { MessageResponse } from './interfaces';

export enum MESSAGERESPON {
   CREATED = 'Created successfully',
   UPDATED = 'Updated successfully',
   DELETED = 'Deleted successfully',
   QUERY = 'Query successfully',
}

export class BaseController {
   protected createSuccessResponse(data: unknown, message?: string): MessageResponse {
      return {
         data: data,
         message: message ? message : MESSAGERESPON.CREATED,
         statusCode: 201,
      };
   }

   protected OkResponse(data: unknown, message?: string): MessageResponse {
      return {
         data: data,
         message: message ? message : MESSAGERESPON.UPDATED,
         statusCode: 200,
      };
   }
}
