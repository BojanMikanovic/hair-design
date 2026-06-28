import {
   Button,
   DateField,
   LabelsTopLayout,
   LookupField,
   NumberField,
   TextArea,
   TextField,
   ValidationGroup,
   Window,
} from 'cx/widgets';
import getController from './Controller';
import m from './model';

export const showCustomerActionsWindow = (actionId?: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const window: any = Window.create(
         <cx>
            <Window
               title={actionId ? 'Izmjena usluge klijentu' : 'Nova usluga klijentu'}
               modal
               center
               closeOnEscape
               controller={getController(resolve, actionId)}
               onDestroy={() => resolve(false)}
               dismissOnPopState
               style={{ width: '650px', top: '5%' }}
            >
               <ValidationGroup invalid={m.formInvalid} visited={m.formVisited}>
                  <div className="grid grid-cols-2 gap-4 p-4">
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
                     </LabelsTopLayout>

                     <LabelsTopLayout vertical mod="stretch">
                        <LookupField
                           label="Usluga"
                           value={m.customerAction.serviceId}
                           text={m.customerAction.serviceName}
                           onQuery="queryServices"
                           optionIdField="id"
                           optionTextField="text"
                           fetchAll
                           cacheAll
                           required
                           style={{ width: '100%' }}
                        />
                     </LabelsTopLayout>

                     <LabelsTopLayout vertical mod="stretch">
                        <DateField label="Datum" value={m.customerAction.date} required style={{ width: '100%' }} />
                     </LabelsTopLayout>

                     <LabelsTopLayout vertical mod="stretch">
                        <NumberField
                           label="Cijena"
                           value={m.customerAction.price}
                           required
                           format="n2"
                           style={{ width: '100%' }}
                        />
                     </LabelsTopLayout>

                     <div className="col-span-2">
                        <LabelsTopLayout vertical mod="stretch">
                           <TextField
                              label="Zabilješke o boji"
                              value={m.customerAction.colorNote}
                              trim
                              style={{ width: '100%' }}
                           />
                        </LabelsTopLayout>
                     </div>

                     <div className="col-span-2">
                        <LabelsTopLayout vertical mod="stretch">
                           <TextArea
                              label="Napomena"
                              value={m.customerAction.note}
                              rows={3}
                              style={{ width: '100%' }}
                           />
                        </LabelsTopLayout>
                     </div>
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
