import { Module } from '@nestjs/common';
import { ListOptionService } from './list-option.service';
import { ListOptionController } from './list-option.controller';

@Module({
  controllers: [ListOptionController],
  providers: [ListOptionService],
})
export class ListOptionModule {}
