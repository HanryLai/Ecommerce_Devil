import { EntityManager, EntityTarget, QueryRunner, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
   constructor(
      /**
       * Entity target that is managed by this repository.
       * If this repository manages entity from schema,
       * then it returns a name of that schema instead.
       */
      readonly target: EntityTarget<T>,
      /**
       * Entity Manager used by this repository.
       */
      readonly manager: EntityManager,
      /**
       * Query runner provider used for this repository.
       */
      readonly queryRunner?: QueryRunner,
   ) {
      super(target, manager, queryRunner);
   }
}
