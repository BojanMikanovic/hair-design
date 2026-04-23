import { Controller } from 'cx/ui';
import m from './model';
import { createUser, getUserById, updateUser } from '../../../api/UserApi';
import { showSuccessToast, showErrorToast } from '../../../components/toasts';

export default (resolve: (value: boolean) => void, userId?: string) =>
   class extends Controller {
      onInit() {
         if (userId) {
            this.loadUser(userId);
         }
      }

      async loadUser(id: string) {
         try {
            const user = await getUserById(id);
            this.store.set(m.user, {
               id: user.id,
               email: user.email,
               firstName: user.firstName,
               lastName: user.lastName,
               pictureUrl: user.pictureUrl ?? null,
            });
         } catch (error) {
            console.error(error);
            showErrorToast('Greška prilikom učitavanja korisnika');
         }
      }

      async addOrEditUser() {
         this.store.set(m.formVisited, true);

         if (this.store.get(m.formInvalid)) return;

         this.store.set(m.saving, true);

         try {
            const user = this.store.get(m.user);

            if (userId) {
               await updateUser(userId, {
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  pictureUrl: user.pictureUrl ?? null,
               });
               showSuccessToast('Korisnik je uspješno izmijenjen');
            } else {
               await createUser({
                  email: user.email,
                  password: user.password ?? '',
                  firstName: user.firstName,
                  lastName: user.lastName,
                  pictureUrl: user.pictureUrl ?? null,
               });
               showSuccessToast('Korisnik je uspješno kreiran');
            }

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
