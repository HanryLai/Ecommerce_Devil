import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from '../interceptor/dto/user-dto.interceptor';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest();
   console.log('request.user', request.user);
   const user: CurrentUserDto = request.user;
   return user;
});
