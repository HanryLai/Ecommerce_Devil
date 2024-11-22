import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';

@Injectable()
export class FakerService extends BaseService {
   constructor() {
      super();
   }

   generateProduct(count: number) {
      const products = [];
      for (let i = 0; i < count; i++) {
         products.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Number.parseInt(faker.commerce.price()),
            image_url: faker.image.urlLoremFlickr(),
         });
      }
      return products;
   }
}
