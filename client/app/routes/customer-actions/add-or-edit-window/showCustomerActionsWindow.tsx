import { LabelsTopLayout } from 'cx/ui';
import { Button, LookupField, TextArea, TextField, ValidationGroup, Window, DateField, NumberField } from 'cx/widgets';
import getController from './Controller';
import m from './model';

export const showCustomerActionsWindow = (actionId?: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const window: any = Window.create(
         <cx>
            <Window
               title={actionId ? 'Izmjena usluge' : 'Nova usluga'}
               modal
               center
               closeOnEscape
               controller={getController(resolve, actionId)}
               onDestroy={() => resolve(false)}
               dismissOnPopState
               style={{ width: '400px' }}
            >
               <ValidationGroup invalid={m.formInvalid} visited={m.formVisited}>
                  <div className="p-4">
                     <LabelsTopLayout vertical mod="stretch">
                        <LookupField
                           label="Klijent"
                           value={m.customerAction.customerId}
                           text={m.customerAction.customerName}
                           onQuery="queryCustomers"
                           optionIdField="id"
                           optionTextField="text"
                           fetchAll
                           cacheAll
                           required
                           style={{ width: '100%' }}
                        />

                        <TextField
                           label="Naziv"
                           value={m.customerAction.title}
                           required
                           trim
                           style={{ width: '100%' }}
                        />

                        <DateField label="Datum" value={m.customerAction.date} required style={{ width: '100%' }} />

                        <NumberField
                           label="Cijena"
                           value={m.customerAction.price}
                           required
                           format="n2"
                           style={{ width: '100%' }}
                        />

                        <TextField
                           label="Zabiljeske o boji"
                           value={m.customerAction.colorNote}
                           trim
                           style={{ width: '100%' }}
                        />

                        <TextArea label="Napomena" value={m.customerAction.note} rows={4} style={{ width: '100%' }} />
                     </LabelsTopLayout>
                  </div>

                  <div putInto="footer" className="flex justify-end gap-2 px-4 py-3">
                     <Button dismiss text="Otkaži" mod="hollow" />
                     <Button mod="primary" onClick="addOrEditCustomerAction" text="Sačuvaj" disabled={m.saving} />
                  </div>
               </ValidationGroup>
            </Window>
         </cx>,
      );

      window.open();
   });
};
