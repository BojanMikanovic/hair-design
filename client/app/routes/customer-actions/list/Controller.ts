import { Controller, Instance } from 'cx/ui';
import { deleteCustomerAction, getAllCustomerActions } from '../../../api/CustomerActionApi';
import { showCustomerActionsWindow } from '../add-or-edit-window/showCustomerActionsWindow';
import { $page, Model } from './model';
import { showErrorToast, showSuccessToast } from '../../../components/toasts';
import { getAllCustomers } from '../../../api/CustomerApi';
import { CustomerResponse } from '../../customers/list/model';

export default class extends Controller<Model> {
   onInit() {
      this.store.init($page.actions, []);
      this.store.init($page.loading, false);
      this.store.init($page.selected, null);
      this.store.init($page.searchQuery, '');
      this.store.init($page.sortField, 'createdAt');
      this.store.init($page.sortDirection, 'DESC');

      this.loadCustomerActions();
   }

   async loadCustomerActions() {
      this.store.set($page.loading, true);

      try {
         const actions = await getAllCustomerActions();
         this.store.set($page.actions, actions);
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom učitavanja usluge');
      } finally {
         this.store.set($page.loading, false);
      }
   }

   async queryCustomers(query: string) {
      try {
         const customers = await getAllCustomers();

         const options = (customers as CustomerResponse[]).map((x) => ({
            id: x.id,
            text: `${x.firstName} ${x.lastName}`,
         }));

         if (!query) return options;

         const q = query.toLowerCase();
         return options.filter((x) => x.text.toLowerCase().includes(q));
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom učitavanja klijenata');
         return [];
      }
   }

   async addCustomerAction() {
      const openAddWindow = await showCustomerActionsWindow();
      if (!openAddWindow) return;

      await this.loadCustomerActions();
   }

   async editCustomerAction(e: any, { store }: Instance) {
      const actionId = store.get($page.selected);
      if (!actionId) return;

      const openEditWindow = await showCustomerActionsWindow(actionId);
      if (!openEditWindow) return;

      await this.loadCustomerActions();
   }

   async deleteCustomerAction() {
      const actionId = this.store.get($page.selected);
      if (!actionId) return;

      try {
         await deleteCustomerAction(actionId);
         showSuccessToast('Usluga je uspješno obrisana');
         this.store.set($page.selected, null);
         await this.loadCustomerActions();
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom brisanja usluge');
      }
   }
}
