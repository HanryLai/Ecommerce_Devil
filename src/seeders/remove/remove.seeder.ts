import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { EntityManager } from 'typeorm';

@Injectable()
export class RemoveAllSeeder extends BaseService {
   constructor(private entity: EntityManager) {
      super();
   }
   async removeAllDatabase() {
      const arrQueryDrop = [
         'DROP TABLE IF EXISTS cart_item CASCADE',
         'DROP TABLE IF EXISTS favorite CASCADE',
         'DROP TABLE IF EXISTS message CASCADE',
         'DROP TABLE IF EXISTS option_cart CASCADE',
         'DROP TABLE IF EXISTS product CASCADE',
         'DROP TABLE IF EXISTS room_account CASCADE',
         'DROP TABLE IF EXISTS room CASCADE',
         'DROP TABLE IF EXISTS shopping_cart CASCADE',
         'DROP TABLE IF EXISTS account CASCADE',
         'DROP TABLE IF EXISTS detail_information CASCADE',
         'DROP TABLE IF EXISTS role CASCADE',
      ];
      for (const query of arrQueryDrop) {
         await this.entity.query(query);
      }
      console.log('Drop all table');
   }
}
