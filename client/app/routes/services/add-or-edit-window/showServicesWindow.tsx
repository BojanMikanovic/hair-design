import { LabelsTopLayout } from 'cx/ui';
import { Button, TextField, ValidationGroup, Window } from 'cx/widgets';
import getController from './Controller';
import m from './model';

export const showServicesWindow = (serviceId?: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const window: any = Window.create(
         <cx>
            <Window
               title={serviceId ? 'Izmjena usluge' : 'Nova usluga'}
               modal
               center
               closeOnEscape
               controller={getController(resolve, serviceId)}
               onDestroy={() => resolve(false)}
               dismissOnPopState
               style={{ width: '400px' }}
            >
               <ValidationGroup invalid={m.formInvalid} visited={m.formVisited}>
                  <div className="p-4">
                     <LabelsTopLayout vertical mod="stretch">
                        <TextField label="Naziv" value={m.service.name} required trim style={{ width: '100%' }} />
                     </LabelsTopLayout>
                  </div>

                  <div putInto="footer" className="flex justify-end gap-2 px-4 py-3">
                     <Button dismiss text="Otkaži" mod="hollow" />
                     <Button mod="primary" onClick="addOrEditService" text="Sačuvaj" disabled={m.saving} />
                  </div>
               </ValidationGroup>
            </Window>
         </cx>,
      );

      window.open();
   });
};
