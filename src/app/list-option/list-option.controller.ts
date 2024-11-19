import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListOptionService } from './list-option.service';
import { CreateListOptionDto } from './dto/create-list-option.dto';
import { UpdateListOptionDto } from './dto/update-list-option.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base';

@ApiTags('ListOption')
@Controller('list-option')
export class ListOptionController extends BaseController {
   constructor(private readonly listOptionService: ListOptionService) {
      super();
   }

   @Get()
   async findAll() {
      return this.listOptionService.findAll();
   }
}
