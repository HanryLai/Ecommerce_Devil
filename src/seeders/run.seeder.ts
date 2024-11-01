import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { AdminSeeder } from './admin.seeder';
import { RoleSeeder } from './role.seeder';
import { FavoriteSeeder } from './favorite.seeder';
import { ProductSeeder } from './product.seeder';
import { CategorySeeder } from './category.seeder';
import { OptionSeeder } from './option.seeder';
import { ListOptionSeeder } from './list-option.seeder';

@Injectable()
export class RunAllSeeder extends BaseService implements OnModuleInit {
   constructor(
      private roleSeeder: RoleSeeder,
      private adminSeeder: AdminSeeder,
      private favoriteSeer: FavoriteSeeder,
      private productSeeder: ProductSeeder,
      private categorySeeder: CategorySeeder,
      private optionSeeder: OptionSeeder,
      private listOptionSeeder: ListOptionSeeder,
   ) {
      super();
   }
   async onModuleInit() {
      await this.roleSeeder.run();
      await this.adminSeeder.run();
      await this.productSeeder.run();
      await this.favoriteSeer.run();
      await this.categorySeeder.run();
      await this.optionSeeder.run();
      await this.listOptionSeeder.run();
   }
}
