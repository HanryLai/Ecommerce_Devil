import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { IPayload } from 'src/app/auth/jwt/IPayload.interface';
import { JWTService } from 'src/app/auth/jwt/jwt.service';
import { BaseService } from '../base';
import { CurrentUserDto } from './dto/user-dto.interceptor';

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
