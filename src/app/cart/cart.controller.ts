import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { BaseController, MESSAGERESPONSE, MessageResponse } from 'src/common/base';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { CurrentUser } from 'src/common/decorators';

@ApiTags('Cart')
@Controller('carts')
export class CartController extends BaseController{
  constructor(private readonly cartService: CartService) {
    super();
  }

  @Post()
  @ApiOperation({ description: 'Create new cart' })
  @ApiResponse({ status: '2XX', description: 'Create new cart successfully' })
  @ApiResponse({ status: '5XX', description: 'Create new cart failed' })
  @UseGuards(AuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  @ApiBearerAuth()
  public async createCart(@CurrentUser() user: CurrentUserDto): Promise<MessageResponse> {
    return this.OkResponse(await this.cartService.createNewCart(user), MESSAGERESPONSE.CREATED);
  }

}
