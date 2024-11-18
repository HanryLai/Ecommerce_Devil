import { MessageResponse } from './interfaces';

export enum MESSAGERESPONSE {
   CREATED = 'Created successfully',
   UPDATED = 'Updated successfully',
   DELETED = 'Deleted successfully',
   QUERIED = 'Query successfully',
}

export class BaseController {
   protected createSuccessResponse(data: unknown, message?: string): MessageResponse {
      return {
         data: data,
         message: message ? message : MESSAGERESPONSE.CREATED,
         statusCode: 201,
      };
   }

   protected OkResponse(data: unknown, message?: string): MessageResponse {
      return {
         data: data,
         message: message ? message : MESSAGERESPONSE.UPDATED,
         statusCode: 200,
      };
   }
}
