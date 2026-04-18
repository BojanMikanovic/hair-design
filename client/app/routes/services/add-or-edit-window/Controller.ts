import { Controller } from 'cx/ui';
import { createService, getServiceById, updateService } from '../../../api/ServiceApi';
import { showErrorToast, showSuccessToast } from '../../../components/toasts';
import m from './model';

export default (resolve: (value: boolean) => void, serviceId?: string) =>
   class extends Controller {
      onInit() {
         if (serviceId) {
            this.loadService(serviceId);
         }
      }

      async loadService(id: string) {
         try {
            const service = await getServiceById(id);
            this.store.set(m.service, service);
         } catch (error) {
            console.error(error);
            showErrorToast('Greška prilikom učitavanja usluge');
         }
      }

      async addOrEditService() {
         this.store.set(m.formVisited, true);

         if (this.store.get(m.formInvalid)) return;

         this.store.set(m.saving, true);

         try {
            const service = this.store.get(m.service);

            if (serviceId) {
               await updateService(serviceId, service);
               showSuccessToast('Usluga je uspješno izmijenjena');
            } else {
               await createService(service);
               showSuccessToast('Usluga je uspješno kreirana');
            }

            resolve(true);
            // @ts-expect-error
            this.instance.dismiss();
         } catch (error) {
            console.error(error);
            showErrorToast('Greška prilikom čuvanja usluge');
         } finally {
            this.store.set(m.saving, false);
         }
      }
   };
