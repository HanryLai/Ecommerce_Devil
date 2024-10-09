import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { BaseService } from '../base';
import { IPayload, JWTService } from 'src/app/auth/jwt';
import { CurrentUserDto } from './dto';

@Injectable()
export class CurrentUserInterceptor extends BaseService implements NestInterceptor {
   constructor(@Inject() private readonly jwtService: JWTService) {
      super();
   }
   async intercept(context: ExecutionContext, next: CallHandler) {
      try {
         const request = context.switchToHttp().getRequest();
         const accessToken = request.headers.authorization.split(' ')[1];
         const payload: IPayload = await this.jwtService.verifyToken(accessToken);
         const userPayLoad: CurrentUserDto = {
            id: payload.id,
            email: payload.email,
            username: payload.username,
            roleName: payload.roleName,
         };
         request.user = userPayLoad;
         return next.handle();
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
