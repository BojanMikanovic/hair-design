import { GridColumnBuilder } from '../../../components/GridColumnBuilder';
import { CustomerResponse } from './model';

const getColumns = () => {
   const cb = new GridColumnBuilder<CustomerResponse>();

   cb.add((m) => m.firstName, {
      header: 'First Name',
      sortable: true,
   });

   cb.add((m) => m.lastName, {
      header: 'Last Name',
      sortable: true,
   });

   cb.add((m) => m.phone, {
      header: 'Phone',
      sortable: true,
   });

   cb.add((m) => m.email, {
      header: 'Email',
      sortable: true,
   });

   cb.add((m) => m.notes, {
      header: 'Notes',
      sortable: true,
   });

   cb.add((m) => m.createdAt, {
      header: 'Created',
      sortable: true,
      format: 'd',
   });

   return cb.get();
};

export default getColumns();
