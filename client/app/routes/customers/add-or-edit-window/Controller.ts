import { Controller } from 'cx/ui';
import m from './model';
import { createCustomer, getCustomerById, updateCustomer } from '../../../api/CustomerApi';
import { showSuccessToast, showErrorToast } from '../../../components/toasts';

export default (resolve: (value: boolean) => void, customerId?: string) =>
   class extends Controller {
      onInit() {
         if (customerId) {
            this.loadCustomer(customerId);
         }
      }

      async loadCustomer(id: string) {
         try {
            const customer = await getCustomerById(id);
            this.store.set(m.customer, customer);
         } catch (error) {
            console.error(error);
            showErrorToast('Greška prilikom učitavanja klijenta');
         }
      }

      async addOrEditCustomer() {
         this.store.set(m.formVisited, true);

         if (this.store.get(m.formInvalid)) return;

         this.store.set(m.saving, true);

         try {
            const customer = this.store.get(m.customer);

            if (customerId) {
               await updateCustomer(customerId, customer);
               showSuccessToast('Klijent je uspješno izmijenjen');
            } else {
               await createCustomer(customer);
               showSuccessToast('Klijent je uspješno kreiran');
            }

            resolve(true);
            // @ts-expect-error
            this.instance.dismiss();
         } catch (error) {
            console.error(error);
            showErrorToast('Greška prilikom čuvanja klijenta');
         } finally {
            this.store.set(m.saving, false);
         }
      }
   };
