import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
}
