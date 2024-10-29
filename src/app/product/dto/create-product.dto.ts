import { IProductEntity } from "src/entities/interfaces/product.entity.interface";

export class CreateProductDto implements IProductEntity {
    name: string;
    quantity: number;
    description: string;
    image: string;
    id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    
}
