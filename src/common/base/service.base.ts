import {
   BadRequestException,
   ConflictException,
   ForbiddenException,
   HttpException,
   HttpStatus,
   InternalServerErrorException,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { BaseError } from './error.base';
import { QueryFailedError, TypeORMError } from 'typeorm';

export class BaseService {
   protected throwError(statusCode: number, message: string): never {
      throw new BaseError(statusCode, message);
   }

   protected throwBadRequest(message: string): never {
      throw new BadRequestException(message);
   }

   protected throwConflict(message: string): never {
      throw new ConflictException(message);
   }

   protected throwForbidden(message: string): never {
      throw new ForbiddenException(message);
   }

   protected throwNotFound(message: string): never {
      throw new NotFoundException(message);
   }

   protected throwUnauthorized(message: string): never {
      throw new UnauthorizedException(message);
   }

   protected throwInternalServerError(message: string): never {
      throw new InternalServerErrorException(message);
   }

   protected handleError(error: unknown): never {
      if (error instanceof HttpException) {
         throw error;
      } else if (error instanceof QueryFailedError) {
         if (error.message.includes('unique constraint')) {
            this.throwConflict('A record with this information already exists');
         } else {
            this.throwInternalServerError(`Database error: ${error.message}`);
         }
      } else if (error instanceof TypeORMError) {
         this.throwInternalServerError(`ORM error: ${error.message}`);
      } else if (error instanceof Error) {
         console.error('Unexpected error:', error);
         this.throwInternalServerError(`Unexpected error: ${error.message}`);
      } else {
         console.error('Unknown error:', error);
         this.throwInternalServerError('An unknown error occurred');
      }
   }
}
