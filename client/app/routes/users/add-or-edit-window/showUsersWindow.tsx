import { LabelsTopLayout } from 'cx/ui';
import { Button, TextField, ValidationGroup, Window } from 'cx/widgets';
import getController from './Controller';
import m from './model';

export const showUsersWindow = (userId?: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const window: any = Window.create(
         <cx>
            <Window
               title={userId ? 'Izmjena korisnika' : 'Novi korisnik'}
               modal
               center
               closeOnEscape
               controller={getController(resolve, userId)}
               onDestroy={() => resolve(false)}
               dismissOnPopState
               style={{ width: '400px' }}
            >
               <ValidationGroup invalid={m.formInvalid} visited={m.formVisited}>
                  <div className="p-4">
                     <LabelsTopLayout vertical mod="stretch">
                        <TextField
                           label="Ime"
                           value={m.user.firstName}
                           required
                           trim
                           autoFocus={!userId}
                           style={{ width: '100%' }}
                        />
                        <TextField
                           label="Prezime"
                           value={m.user.lastName}
                           required
                           trim
                           style={{ width: '100%' }}
                        />
                        <TextField
                           label="Email"
                           value={m.user.email}
                           required
                           trim
                           inputType="email"
                           style={{ width: '100%' }}
                        />
                        {!userId && (
                           <TextField
                              label="Lozinka"
                              value={m.user.password}
                              required
                              inputType="password"
                              minLength={6}
                              style={{ width: '100%' }}
                           />
                        )}
                        <TextField
                           label="URL slike (opcionalno)"
                           value={m.user.pictureUrl}
                           trim
                           style={{ width: '100%' }}
                        />
                     </LabelsTopLayout>
                  </div>

                  <div putInto="footer" className="flex justify-end gap-2 px-4 py-3">
                     <Button dismiss text="Otkaži" mod="hollow" />
                     <Button mod="primary" onClick="addOrEditUser" text="Sačuvaj" disabled={m.saving} />
                  </div>
               </ValidationGroup>
            </Window>
         </cx>,
      );

      window.open();
   });
};
