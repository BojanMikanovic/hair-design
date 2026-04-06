import { Controller, Instance } from 'cx/ui';
import { deleteCustomer, getAllCustomers } from '../../../api/CustomerApi';
import { showCustomersWindow } from '../add-or-edit-window/showCustomersWindow';
import { $page, Model } from './model';
import { showErrorToast, showSuccessToast } from '../../../components/toasts';

export default class extends Controller<Model> {
   onInit() {
      this.store.init($page.customers, []);
      this.store.init($page.loading, false);
      this.store.init($page.selected, null);
      this.store.init($page.searchQuery, '');
      this.store.init($page.sortField, 'firstName');
      this.store.init($page.sortDirection, 'ASC');

      this.loadCustomers();
   }

   async loadCustomers() {
      this.store.set($page.loading, true);

      try {
         const customers = await getAllCustomers();
         this.store.set($page.customers, customers);
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom učitavanja klijenata');
      } finally {
         this.store.set($page.loading, false);
      }
   }

   async addCustomer() {
      const openAddWindow = await showCustomersWindow();
      if (!openAddWindow) return;

      await this.loadCustomers();
   }

   async editCustomer(e: any, { store }: Instance) {
      const customerId = store.get($page.selected);
      if (!customerId) return;

      const openEditWindow = await showCustomersWindow(customerId);
      if (!openEditWindow) return;

      await this.loadCustomers();
   }

   async deleteCustomer() {
      const customerId = this.store.get($page.selected);
      if (!customerId) return;

      try {
         await deleteCustomer(customerId);
         showSuccessToast('Klijent je uspješno obrisan');
         this.store.set($page.selected, null);
         await this.loadCustomers();
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom brisanja klijenta');
      }
   }
}
