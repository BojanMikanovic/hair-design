import { GridColumnBuilder } from '../../../components/GridColumnBuilder';
import { CustomerResponse } from './model';

const getColumns = () => {
   const cb = new GridColumnBuilder<CustomerResponse>();

   cb.add((m) => m.firstName, {
      header: 'Ime',
      sortable: true,
   });

   cb.add((m) => m.lastName, {
      header: 'Prezime',
      sortable: true,
   });

   cb.add((m) => m.phone, {
      header: 'Telefon',
      sortable: true,
   });

   cb.add((m) => m.email, {
      header: 'Email',
      sortable: true,
   });

   cb.add((m) => m.notes, {
      header: 'Napomena',
      sortable: true,
   });

   cb.add((m) => m.createdAt, {
      header: 'Datum kreiranja',
      sortable: true,
      format: 'd',
   });

   return cb.get();
};

export default getColumns();
