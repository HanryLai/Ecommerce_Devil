import { BaseEntity } from 'src/entities/base';

export class TransformDataQuery<T> {
   private option: Record<string, any>;
   constructor(option: Record<string, any>) {
      this.option = option;
   }

   public standardField(option: Partial<Record<keyof T, boolean | false>>): Record<string, any> {
      let optionResult: Record<string, any> = {};
      Object.keys(option).forEach((key) => {
         if (option[key] === true) {
            optionResult[key as string] = this.option[key as string];
         }
      });
      delete optionResult['isActive'];
      return optionResult;
   }
}
