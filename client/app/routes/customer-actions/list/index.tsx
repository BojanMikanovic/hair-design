import { KeySelection, PureContainer, expr } from 'cx/ui';
import { getSearchQueryPredicate } from 'cx/util';
import { Button, DocumentTitle, Grid, LookupField, TextField } from 'cx/widgets';
import Controller from './Controller';
import columns from './columns';
import { $page, CustomerActionResponse } from './model';

export default (
   <cx>
      <PureContainer controller={Controller}>
         <div className="flex h-full flex-col p-2">
            <div className="mb-2 flex items-center justify-between">
               <h3 className="text-lg font-semibold">Usluge</h3>

               <div className="flex items-center gap-2">
                  <LookupField
                     value={$page.customerId}
                     text={$page.customerName}
                     onQuery="queryCustomers"
                     optionIdField="id"
                     optionTextField="text"
                     fetchAll
                     cacheAll
                     placeholder="Klijent"
                     style={{ width: '220px' }}
                  />

                  <TextField placeholder="Pretraži usluge..." value={$page.searchQuery} icon="search" trim showClear />
                  <Button onClick="addCustomerAction" text="Dodaj" mod="primary" icon="plus" />
               </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-white text-slate-600">
               <div className="flex justify-between border-b p-2">
                  <div>
                     <Button
                        text="Izmijeni"
                        disabled={expr($page.selected, (s) => !s)}
                        icon="pencil"
                        mod="secondary"
                        class="mr-2"
                        onClick="editCustomerAction"
                     />

                     <Button
                        text="Obriši"
                        disabled={expr($page.selected, (s) => !s)}
                        icon="x"
                        mod="danger"
                        onClick="deleteCustomerAction"
                        confirm={{
                           title: 'Brisanje usluge',
                           message: 'Da li ste sigurni da želite obrisati odabranu uslugu?',
                           yesText: 'Obriši',
                           noText: 'Otkaži',
                           yesButtonMod: 'danger',
                        }}
                     />
                  </div>
               </div>

               <Grid<CustomerActionResponse>
                  records={$page.actions}
                  columns={columns}
                  emptyText="Nema podataka"
                  className="flex-1"
                  onRowDoubleClick="editCustomerAction"
                  selection={{ type: KeySelection, bind: $page.selected, keyField: 'id' }}
                  sortField={$page.sortField}
                  sortDirection={$page.sortDirection}
                  filterParams={{ query: $page.searchQuery, customerId: $page.customerId }}
                  onCreateFilter={({ query, customerId }) => {
                     let predicate = getSearchQueryPredicate(query);

                     return (record) => {
                        if (customerId && record.customerId !== customerId) return false;

                        return (
                           predicate(record.title) ||
                           predicate(record.note) ||
                           predicate(record.colorNote) ||
                           predicate(record.customerName)
                        );
                     };
                  }}
                  scrollable
                  lockColumnWidths
               />
            </div>

            <DocumentTitle text="Customer Actions" />
         </div>
      </PureContainer>
   </cx>
);
