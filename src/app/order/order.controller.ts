import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import {  MESSAGERESPONSE, MessageResponse } from '@/common/base';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUserDto, CurrentUserInterceptor } from '@/common/interceptor';
import { CurrentUser } from '@/common/decorators';

import { BaseController } from 'src/common/base';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@/common/guard';
@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@ApiTags('Order')
@Controller('orders')
export class OrderController extends BaseController {
   constructor(private readonly orderService: OrderService) {
      super();
   }

   @Get()
   @ApiResponse({ status: '2XX', description: 'Get all orders' })
   @ApiResponse({ status: '4XX', description: 'Order not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   public async getAllOrder(@CurrentUser() user: CurrentUserDto): Promise<MessageResponse> {
      return this.OkResponse(await this.orderService.getOrders(user), MESSAGERESPONSE.QUERIED);
   }

    @Post()
    @ApiResponse({ status: '2XX', description: 'Create order' })
    @ApiResponse({ status: '4XX', description: 'Order not found' })
    @ApiResponse({ status: '5XX', description: 'Internal server error' })
    @HttpCode(200)
    public async orderMulti(@CurrentUser() user: CurrentUserDto, @Body() createOrderDto: CreateOrderDto): Promise<MessageResponse> {
        return this.OkResponse(await this.orderService.orderMulti(user, createOrderDto), MESSAGERESPONSE.CREATED);
    }
}
