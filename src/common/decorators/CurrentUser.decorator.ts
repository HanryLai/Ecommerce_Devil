import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from '../interceptor';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest();
   const user: CurrentUserDto = request.user;
   return user;
});
