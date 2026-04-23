import { LabelsTopLayout, expr } from 'cx/ui';
import { Button, TextField, ValidationGroup, Window } from 'cx/widgets';
import getController from './Controller';
import m from './model';

export const showResetPasswordWindow = (userId: string): Promise<boolean> => {
   return new Promise((resolve) => {
      const window: any = Window.create(
         <cx>
            <Window
               title="Promjena lozinke"
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
                           label="Nova lozinka"
                           value={m.form.newPassword}
                           required
                           inputType="password"
                           minLength={6}
                           autoFocus
                           style={{ width: '100%' }}
                        />
                        <TextField
                           label="Potvrda nove lozinke"
                           value={m.form.confirmPassword}
                           required
                           inputType="password"
                           style={{ width: '100%' }}
                           error={expr(m.form.newPassword, m.form.confirmPassword, (a, b) =>
                              a && b && a !== b ? 'Lozinke se ne podudaraju.' : null,
                           )}
                        />
                     </LabelsTopLayout>
                  </div>

                  <div putInto="footer" className="flex justify-end gap-2 px-4 py-3">
                     <Button dismiss text="Otkaži" mod="hollow" />
                     <Button mod="primary" onClick="submit" text="Sačuvaj" disabled={m.saving} />
                  </div>
               </ValidationGroup>
            </Window>
         </cx>,
      );

      window.open();
   });
};
