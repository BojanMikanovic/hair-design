import { Controller } from 'cx/ui';
import m from './model';
import { resetUserPassword } from '../../../api/UserApi';
import { showSuccessToast, showErrorToast } from '../../../components/toasts';

export default (resolve: (value: boolean) => void, userId: string) =>
   class extends Controller {
      async submit() {
         this.store.set(m.formVisited, true);

         const form = this.store.get(m.form);
         const matches = !!form?.newPassword && form.newPassword === form.confirmPassword;
         this.store.set(m.passwordsMatch, matches);

         if (this.store.get(m.formInvalid) || !matches) return;

         this.store.set(m.saving, true);

         try {
            await resetUserPassword(userId, { newPassword: form.newPassword });
            showSuccessToast('Lozinka je uspješno promijenjena');
            resolve(true);
            // @ts-expect-error
            this.instance.dismiss();
         } catch (error) {
            console.error(error);
            showErrorToast(error);
         } finally {
            this.store.set(m.saving, false);
         }
      }
   };
