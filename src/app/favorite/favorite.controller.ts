import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   Inject,
   UseGuards,
   UseInterceptors,
   HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { BaseController, MESSAGERESPONSE, MessageResponse } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators';

@ApiTags('Favorite')
@Controller('favorites')
export class FavoriteController extends BaseController {
   constructor(private readonly favoriteService: FavoriteService) {
      super();
   }

   @Get('/my-favorites')
   @ApiOperation({ description: 'Get all favorite products by account' })
   @ApiResponse({ status: '2XX', description: 'Get all favorite products by account successfully' })
   @ApiResponse({ status: '5XX', description: 'Get all favorite products by account failed' })
   @HttpCode(200)
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   public async findAllByAccount(@CurrentUser() user: CurrentUserDto): Promise<MessageResponse> {
      return this.OkResponse(
         await this.favoriteService.findByAccount(user),
         MESSAGERESPONSE.QUERIED,
      );
   }

   @Post(':productId')
   @ApiOperation({ description: 'Add product to favorite' })
   @ApiResponse({ status: '2XX', description: 'Add product to favorite successfully' })
   @ApiResponse({ status: '5XX', description: 'Add product to favorite failed' })
   @HttpCode(201)
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   public async addFavorite(
      @CurrentUser() user: CurrentUserDto,
      @Param('productId') productId: string,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.favoriteService.addFavorite(user, productId),
         MESSAGERESPONSE.CREATED,
      );
   }

   @Delete(':productId')
   @ApiOperation({ description: 'Remove product from favorite' })
   @ApiResponse({ status: '2XX', description: 'Remove product from favorite successfully' })
   @ApiResponse({ status: '5XX', description: 'Remove product from favorite failed' })
   @HttpCode(200)
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   public async removeFavorite(
      @CurrentUser() user: CurrentUserDto,
      @Param('productId') productId: string,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.favoriteService.removeFavorite(user, productId),
         MESSAGERESPONSE.DELETED,
      );
   }
}
