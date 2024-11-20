import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { AdminSeeder } from './admin.seeder';
import { RoleSeeder } from './role.seeder';
import { FavoriteSeeder } from './favorite.seeder';
import { ProductSeeder } from './product.seeder';
import { EntityManager } from 'typeorm';

@Injectable()
export class RunAllSeeder extends BaseService implements OnModuleInit {
   constructor(
      private roleSeeder: RoleSeeder,
      private adminSeeder: AdminSeeder,
      private favoriteSeer: FavoriteSeeder,
      private productSeeder: ProductSeeder,
      private entity: EntityManager,
   ) {
      super();
   }

   async onModuleInit() {
      await this.roleSeeder.run();
      await this.adminSeeder.run();
      await this.productSeeder.run();
      await this.favoriteSeer.run();
   }
}
