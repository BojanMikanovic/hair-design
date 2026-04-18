import { GridColumnBuilder } from '../../../components/GridColumnBuilder';
import { CustomerActionResponse } from './model';

const getColumns = () => {
   const cb = new GridColumnBuilder<CustomerActionResponse>();

   cb.add((m) => m.customerName, {
      header: 'Klijent',
      sortable: true,
   });

   cb.add((m) => m.serviceName, {
      header: 'Naziv',
      sortable: true,
   });

   cb.add((m) => m.date, {
      header: 'Datum',
      sortable: true,
      format: 'd',
   });

   cb.add((m) => m.price, {
      header: 'Cijena',
      sortable: true,
      format: 'n2',
   });

   cb.add((m) => m.colorNote, {
      header: 'Boja',
      sortable: true,
   });

   cb.add((m) => m.note, {
      header: 'Napomena',
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
