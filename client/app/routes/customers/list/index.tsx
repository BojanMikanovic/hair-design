import { KeySelection, PureContainer, expr } from 'cx/ui';
import { getSearchQueryPredicate } from 'cx/util';
import { Button, DocumentTitle, Grid, TextField } from 'cx/widgets';
import Controller from './Controller';
import columns from './columns';
import { $page, CustomerResponse } from './model';

export default (
   <cx>
      <PureContainer controller={Controller}>
         <div className="flex h-full flex-col p-2">
            <div className="mb-2 flex items-center justify-between">
               <h3 className="text-lg font-semibold">Klijenti</h3>

               <div className="flex items-center gap-2">
                  <TextField placeholder="Pretraži klijente" value={$page.searchQuery} icon="search" trim showClear />
                  <Button onClick="addCustomer" text="Dodaj" mod="primary" icon="plus" />
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
                        onClick="editCustomer"
                     />

                     <Button
                        text="Obriši"
                        disabled={expr($page.selected, (s) => !s)}
                        icon="x"
                        mod="danger"
                        onClick="deleteCustomer"
                        confirm={{
                           title: 'Brisanje klijenta',
                           message: 'Da li ste sigurni da želite obrisati odabranog klijenta?',
                           yesText: 'Obriši',
                           noText: 'Otkaži',
                           yesButtonMod: 'danger',
                        }}
                     />
                  </div>
               </div>

               <Grid<CustomerResponse>
                  records={$page.customers}
                  columns={columns}
                  emptyText="No data to show"
                  className="flex-1"
                  onRowDoubleClick="editCustomer"
                  selection={{ type: KeySelection, bind: $page.selected, keyField: 'id' }}
                  sortField={$page.sortField}
                  sortDirection={$page.sortDirection}
                  filterParams={{ query: $page.searchQuery }}
                  onCreateFilter={({ query }) => {
                     let predicate = getSearchQueryPredicate(query);
                     return (record) => predicate(record.firstName) || predicate(record.lastName);
                  }}
                  scrollable
                  lockColumnWidths
               />
            </div>

            <DocumentTitle text="Customers" />
         </div>
      </PureContainer>
   </cx>
);
