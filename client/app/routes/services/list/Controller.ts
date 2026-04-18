import { Controller, Instance } from 'cx/ui';
import { deleteService, getAllServices } from '../../../api/ServiceApi';
import { showErrorToast, showSuccessToast } from '../../../components/toasts';
import { showServicesWindow } from '../add-or-edit-window/showServicesWindow';
import { $page, Model } from './model';

export default class extends Controller<Model> {
   onInit() {
      this.store.init($page.services, []);
      this.store.init($page.loading, false);
      this.store.init($page.selected, null);
      this.store.init($page.searchQuery, '');
      this.store.init($page.sortField, 'createdAt');
      this.store.init($page.sortDirection, 'DESC');

      this.loadServices();
   }

   async loadServices() {
      this.store.set($page.loading, true);

      try {
         const services = await getAllServices();
         this.store.set($page.services, services);
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom učitavanja usluga');
      } finally {
         this.store.set($page.loading, false);
      }
   }

   async addService() {
      const openAddWindow = await showServicesWindow();
      if (!openAddWindow) return;

      await this.loadServices();
   }

   async editService(e: any, { store }: Instance) {
      const serviceId = store.get($page.selected);
      if (!serviceId) return;

      const openEditWindow = await showServicesWindow(serviceId);
      if (!openEditWindow) return;

      await this.loadServices();
   }

   async deleteService() {
      const serviceId = this.store.get($page.selected);
      if (!serviceId) return;

      try {
         await deleteService(serviceId);
         showSuccessToast('Usluga je uspješno obrisana');
         this.store.set($page.selected, null);
         await this.loadServices();
      } catch (error) {
         console.error(error);
         showErrorToast('Greška prilikom brisanja usluge');
      }
   }
}
