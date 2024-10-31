import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { BaseController, MessageResponse } from 'src/common/base';

@Controller('favorite')
export class FavoriteController extends BaseController{
  constructor(private readonly favoriteService: FavoriteService) {
    super();
  }

  @Get()
  public async findAll(): Promise<MessageResponse> {
    return this.OkResponse(await this.favoriteService.findAll());
  }

  @Get(':idAccount')
  public async findByAccount(@Param('idAccount') idAccount: string): Promise<MessageResponse> {
    return this.OkResponse(await this.favoriteService.findByAccount(idAccount));
  }

  @Post()
  public async addFavorite(@Body() createFavoriteDto: CreateFavoriteDto): Promise<MessageResponse> {
    return this.OkResponse(await this.favoriteService.addFavorite(createFavoriteDto));
  }

  @Delete()
  public async removeFavorite(@Body() createFavoriteDto: CreateFavoriteDto): Promise<MessageResponse> {
    return this.OkResponse(await this.favoriteService.removeFavorite(createFavoriteDto));
  }

  

}
