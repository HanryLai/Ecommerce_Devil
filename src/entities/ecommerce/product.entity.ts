import { Column, Entity, Table } from "typeorm";
import { BaseEntity } from "../base";

@Entity()
export class ProductEntity extends BaseEntity<ProductEntity>{
    @Column({ type: 'varchar', length: 255 })
    name: string;
    @Column({ type: 'int' })
    quantity: number;
    description: string;
    image: string;

    
}