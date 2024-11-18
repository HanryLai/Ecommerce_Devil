import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { BaseController, MESSAGERESPONSE, MessageResponse } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators';

@ApiTags('Favorite')
@Controller('favorites')
export class FavoriteController extends BaseController {
   constructor(private readonly favoriteService: FavoriteService) {
      super();
   }

   @Get()
   public async findAll(): Promise<MessageResponse> {
      return this.OkResponse(await this.favoriteService.findAll());
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Get()
   public async findAllByAccount(@CurrentUser() user: CurrentUserDto): Promise<MessageResponse> {
      return this.OkResponse(
         await this.favoriteService.findByAccount(user),
         MESSAGERESPONSE.QUERIED,
      );
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Post(':productId')
   public async addFavorite(
      @CurrentUser() user: CurrentUserDto,
      @Param('productId') productId: string,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.favoriteService.addFavorite(user, productId));
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Delete(':productId')
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
