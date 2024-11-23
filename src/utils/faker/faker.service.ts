import { DetailInformationEntity } from '@/entities/auth';
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

   generateOption(count: number) {
      const options = [];
      for (let i = 0; i < count; i++) {
         options.push({
            name: faker.helpers.arrayElement(['Color', 'Size', 'Memory', 'Material']),
            description: faker.commerce.productDescription(),
         });
      }
      return options;
   }

   generateListOption(optionName: string, count: number) {
      const listOptions = [];
      const values = {
         Color: ['Yellow', 'Red', 'Black'],
         Size: ['M', 'L', 'XL'],
         Memory: ['8GB', '16GB', '32GB', '64GB'],
         Material: ['Plastic', 'Metal'],
      };

      const optionValues = values[optionName] || [];

      for (let i = 0; i < count; i++) {
         listOptions.push({
            name: faker.helpers.arrayElement(optionValues),
            description: faker.commerce.productDescription(),
         });
      }
      return listOptions;
   }

   generateDetailInformation(detailInformation: DetailInformationEntity): DetailInformationEntity {
      detailInformation.address = faker.address.streetAddress();
      detailInformation.phone = faker.phone.number();
      detailInformation.full_name = faker.name.fullName();
      detailInformation.avatar_url = faker.image.avatar();
      return detailInformation;
   }
}
