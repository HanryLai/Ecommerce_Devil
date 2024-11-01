import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListOptionService } from './list-option.service';
import { CreateListOptionDto } from './dto/create-list-option.dto';
import { UpdateListOptionDto } from './dto/update-list-option.dto';

@Controller('list-option')
export class ListOptionController {
  constructor(private readonly listOptionService: ListOptionService) {}

  @Post()
  create(@Body() createListOptionDto: CreateListOptionDto) {
    return this.listOptionService.create(createListOptionDto);
  }

  @Get()
  findAll() {
    return this.listOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listOptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListOptionDto: UpdateListOptionDto) {
    return this.listOptionService.update(+id, updateListOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listOptionService.remove(+id);
  }
}
