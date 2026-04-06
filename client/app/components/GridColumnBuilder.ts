import { createAccessorModelProxy } from 'cx/data';
import { AccessorChain } from 'cx/src/core';
import { GridColumnConfig } from 'cx/widgets';

export class GridColumnBuilder<Model> {
   columns: GridColumnConfig[];
   model: AccessorChain<Model>;

   constructor() {
      this.columns = [];
      this.model = createAccessorModelProxy<Model>();
   }

   getRecordAccessor(): AccessorChain<{ $record: Model }> {
      return createAccessorModelProxy<{ $record: Model }>();
   }

   add<X>(fieldAccessor: (m: AccessorChain<Model>) => AccessorChain<X>, columnOptions: GridColumnConfig) {
      let field = fieldAccessor(this.model);
      this.columns.push({
         field: field.toString(),
         ...columnOptions,
      });
   }

   // dummy column
   addDummy(column: GridColumnConfig) {
      this.columns.push(column);
   }

   // set(field: string, column: GridColumnConfig) {
   // 	this.config[field] = column;
   // }

   get(): GridColumnConfig[] {
      return this.columns;
   }
}
