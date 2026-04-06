import { LabelsTopLayout } from 'cx/ui';
import { Button, TextArea, TextField, ValidationGroup, Window } from 'cx/widgets';
import getController from './Controller';
import m from './model';

export const showCustomersWindow = (customerId?: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const window: any = Window.create(
         <cx>
            <Window
               title={customerId ? 'Izmjena klijenta' : 'Novi klijent'}
               modal
               center
               closeOnEscape
               controller={getController(resolve, customerId)}
               onDestroy={() => resolve(false)}
               dismissOnPopState
               style={{ width: '480px' }}
            >
               <ValidationGroup invalid={m.formInvalid} visited={m.formVisited}>
                  <div className="p-4">
                     <LabelsTopLayout vertical mod="stretch">
                        <TextField
                           label="Ime"
                           value={m.customer.firstName}
                           required
                           trim
                           autoFocus={!customerId}
                           style={{ width: '100%' }}
                        />
                        <TextField
                           label="Prezime"
                           value={m.customer.lastName}
                           required
                           trim
                           style={{ width: '100%' }}
                        />
                        <TextField label="Telefon" value={m.customer.phone} trim style={{ width: '100%' }} />
                        <TextField
                           label="Email"
                           value={m.customer.email}
                           trim
                           inputType="email"
                           style={{ width: '100%' }}
                        />
                        <TextArea label="Napomena" value={m.customer.notes} rows={4} style={{ width: '100%' }} />
                     </LabelsTopLayout>
                  </div>

                  <div putInto="footer" className="flex justify-end gap-2 px-4 py-3">
                     <Button dismiss text="Otkaži" mod="hollow" />
                     <Button mod="primary" onClick="addOrEditCustomer" text="Sačuvaj" disabled={m.saving} />
                  </div>
               </ValidationGroup>
            </Window>
         </cx>,
      );

      window.open();
   });
};
