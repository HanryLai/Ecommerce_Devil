import {
   Body,
   Controller,
   Get,
   HttpCode,
   Param,
   Post,
   Query,
   UseGuards,
   UseInterceptors,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { BaseController, BaseService, MessageResponse } from '@/common/base';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from '@/common/interceptor';
import { CurrentUser } from '@/common/decorators';

@Controller('payment')
export class PaymentController extends BaseController {
   constructor(private readonly paymentService: PaymentService) {
      super();
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @Get('successfully')
   @ApiResponse({ status: '2XX', description: 'Payment successfylly' })
   @ApiResponse({ status: '4XX', description: 'Order not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   async successfully(
      @Query('orderId') orderId: string,
      @CurrentUser() user: CurrentUserDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.paymentService.informPayment(user, orderId),
         'Payment successfylly',
      );
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @Post(':orderId')
   @ApiResponse({ status: '2XX', description: 'Payment successfylly' })
   @ApiResponse({ status: '4XX', description: 'Order not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   async pay(
      @Param('orderId') orderId: string,
      @CurrentUser() user: CurrentUserDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.paymentService.pay(user, orderId), 'Payment successfylly');
   }
}
