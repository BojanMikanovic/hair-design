import { Controller, Instance } from 'cx/ui';
import { deleteUser, getAllUsers } from '../../../api/UserApi';
import { showUsersWindow } from '../add-or-edit-window/showUsersWindow';
import { showResetPasswordWindow } from '../reset-password-window/showResetPasswordWindow';
import { $page, Model } from './model';
import { showErrorToast, showSuccessToast } from '../../../components/toasts';

export default class extends Controller<Model> {
   onInit() {
      this.store.init($page.users, []);
      this.store.init($page.loading, false);
      this.store.init($page.selected, null);
      this.store.init($page.searchQuery, '');
      this.store.init($page.sortField, 'lastName');
      this.store.init($page.sortDirection, 'ASC');

      this.loadUsers();
   }

   async loadUsers() {
      this.store.set($page.loading, true);

      try {
         const users = await getAllUsers();
         this.store.set($page.users, users);
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom učitavanja korisnika');
      } finally {
         this.store.set($page.loading, false);
      }
   }

   async addUser() {
      const saved = await showUsersWindow();
      if (!saved) return;
      await this.loadUsers();
   }

   async editUser(_e: any, { store }: Instance) {
      const userId = store.get($page.selected);
      if (!userId) return;

      const saved = await showUsersWindow(userId);
      if (!saved) return;
      await this.loadUsers();
   }

   async resetPassword() {
      const userId = this.store.get($page.selected);
      if (!userId) return;

      await showResetPasswordWindow(userId);
   }

   async deleteUser() {
      const userId = this.store.get($page.selected);
      if (!userId) return;

      try {
         await deleteUser(userId);
         showSuccessToast('Korisnik je uspješno obrisan');
         this.store.set($page.selected, null);
         await this.loadUsers();
      } catch (error) {
         console.error(error);
         showErrorToast(error);
      }
   }
}
