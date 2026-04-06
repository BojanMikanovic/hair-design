import { LabelsTopLayout } from 'cx/ui';
import { Button, TextArea, TextField, ValidationGroup, Window } from 'cx/widgets';
import getController from './Controller';
import m from './model';

export const showCustomersWindow = (customerId?: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const window: any = Window.create(
         <cx>
            <Window
               title={customerId ? 'Edit customer' : 'Add new customer'}
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
                           label="First Name"
                           value={m.customer.firstName}
                           required
                           trim
                           autoFocus={!customerId}
                           style={{ width: '100%' }}
                        />
                        <TextField
                           label="Last Name"
                           value={m.customer.lastName}
                           required
                           trim
                           style={{ width: '100%' }}
                        />
                        <TextField label="Phone" value={m.customer.phone} trim style={{ width: '100%' }} />
                        <TextField
                           label="Email"
                           value={m.customer.email}
                           trim
                           inputType="email"
                           style={{ width: '100%' }}
                        />
                        <TextArea label="Notes" value={m.customer.notes} rows={4} style={{ width: '100%' }} />
                     </LabelsTopLayout>
                  </div>

                  <div putInto="footer" className="flex justify-end gap-2 px-4 py-3">
                     <Button dismiss text="Cancel" mod="hollow" />
                     <Button mod="primary" onClick="addOrEditCustomer" text="Save" disabled={m.saving} />
                  </div>
               </ValidationGroup>
            </Window>
         </cx>,
      );

      window.open();
   });
};
