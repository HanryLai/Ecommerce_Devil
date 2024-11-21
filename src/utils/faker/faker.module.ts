import { Module } from '@nestjs/common';
import { FakerService } from './faker.service';

@Module({
  imports: [],
  providers: [FakerService],
  exports: [FakerService],
})
export class FakerModule {}
