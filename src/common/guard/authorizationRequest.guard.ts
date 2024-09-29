import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseError } from '../base';

@Injectable()
export class AuthGuard implements CanActivate {
   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      if (!request.header.authorization)
         throw new BaseError('UnauthorizedException', HttpStatus.UNAUTHORIZED, 'You must login');
      return true;
   }
}
