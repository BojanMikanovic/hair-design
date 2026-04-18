import { GridColumnBuilder } from '../../../components/GridColumnBuilder';
import { ServiceResponse } from './model';

const getColumns = () => {
   const cb = new GridColumnBuilder<ServiceResponse>();

   cb.add((m) => m.name, {
      header: 'Naziv',
      sortable: true,
   });

   cb.add((m) => m.createdAt, {
      header: 'Kreirano',
      sortable: true,
      format: 'd',
   });

   return cb.get();
};

export default getColumns();
