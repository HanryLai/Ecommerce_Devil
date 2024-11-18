import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { BaseController, MESSAGERESPON, MessageResponse } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators';

@Controller('favorite')
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
   public async findAllByAccount(
      @CurrentUser() user: CurrentUserDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.favoriteService.findByAccount(user), MESSAGERESPON.QUERY);
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Post(':product')
   public async addFavorite(
      @CurrentUser() user: CurrentUserDto,
      @Param('product') product: string,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.favoriteService.addFavorite(user, product));
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Delete(':product')
   public async removeFavorite(
      @CurrentUser() user: CurrentUserDto,
      @Param('product') product: string
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.favoriteService.removeFavorite(user, product), MESSAGERESPON.DELETED );
   }
}
