import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
   UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { BaseController, MESSAGERESPONSE, MessageResponse } from 'src/common/base';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { CurrentUser } from 'src/common/decorators';
import { AddItemCartDto } from './dto/add-item-cart.dto';
import { UpdateItemCartDto } from './dto/update-item-cart.dto';

@ApiTags('Cart')
@Controller('carts')
export class CartController extends BaseController {
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

   @Post('add-product')
   @ApiOperation({ description: 'Add product to cart' })
   @ApiResponse({ status: '2XX', description: 'Add product to cart successfully' })
   @ApiResponse({ status: '5XX', description: 'Add product to cart failed' })
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   public async addProductToCart(
      @CurrentUser() user: CurrentUserDto,
      @Body() addItemCartDto: AddItemCartDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.cartService.addProductToCart(user, addItemCartDto),
         MESSAGERESPONSE.CREATED,
      );
   }

   @Get()
   @ApiOperation({ description: 'Get cart' })
   @ApiResponse({ status: '2XX', description: 'Get cart successfully' })
   @ApiResponse({ status: '5XX', description: 'Get cart failed' })
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   public async getCart(@CurrentUser() user: CurrentUserDto): Promise<MessageResponse> {
      return this.OkResponse(await this.cartService.findCartByUser(user), MESSAGERESPONSE.QUERIED);
   }

   @Patch('update-product/:id')
   @ApiOperation({ description: 'Update product in cart' })
   @ApiResponse({ status: '2XX', description: 'Update product in cart successfully' })
   @ApiResponse({ status: '5XX', description: 'Update product in cart failed' })
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   public async updateProductInCart(
      @CurrentUser() user: CurrentUserDto,
      @Param('id') id: string,
      @Body() updateItemCartDto: UpdateItemCartDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.cartService.updateCartItem(user, id, updateItemCartDto),
         MESSAGERESPONSE.UPDATED,
      );
   }

   @Delete('remove-product/:id')
   @ApiOperation({ description: 'Remove product in cart' })
   @ApiResponse({ status: '2XX', description: 'Remove product in cart successfully' })
   @ApiResponse({ status: '5XX', description: 'Remove product in cart failed' })
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   public async removeProductInCart(
      @CurrentUser() user: CurrentUserDto,
      @Param('id') id: string,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.cartService.deleteCartItem(user, id),
         MESSAGERESPONSE.DELETED,
      );
   }
}
