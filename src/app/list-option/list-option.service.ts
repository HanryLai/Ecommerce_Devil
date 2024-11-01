import { Injectable } from '@nestjs/common';
import { CreateListOptionDto } from './dto/create-list-option.dto';
import { UpdateListOptionDto } from './dto/update-list-option.dto';

@Injectable()
export class ListOptionService {
  create(createListOptionDto: CreateListOptionDto) {
    return 'This action adds a new listOption';
  }

  findAll() {
    return `This action returns all listOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listOption`;
  }

  update(id: number, updateListOptionDto: UpdateListOptionDto) {
    return `This action updates a #${id} listOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} listOption`;
  }
}
