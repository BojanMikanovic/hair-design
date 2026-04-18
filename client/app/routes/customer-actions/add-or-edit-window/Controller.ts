import { Controller } from 'cx/ui';
import { createCustomerAction, getCustomerActionById, updateCustomerAction } from '../../../api/CustomerActionApi';
import { getAllCustomers } from '../../../api/CustomerApi';
import { getAllServices } from '../../../api/ServiceApi';
import { showErrorToast, showSuccessToast } from '../../../components/toasts';
import { ServiceResponse } from '../../services/list/model';
import m from './model';

export default (resolve: (value: boolean) => void, actionId?: string) =>
   class extends Controller {
      onInit() {
         if (actionId) {
            this.loadCustomerAction(actionId);
         }
      }

      async loadCustomerAction(id: string) {
         try {
            const customerAction = await getCustomerActionById(id);
            this.store.set(m.customerAction, customerAction);
         } catch (error) {
            console.error(error);
            showErrorToast('Greška prilikom učitavanja usluge');
         }
      }

      async queryCustomers(query: string) {
         try {
            const customers = await getAllCustomers();

            const options = (customers || []).map((x) => ({
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

      async queryServices(query: string) {
         try {
            const services = await getAllServices();

            const options = (services as ServiceResponse[]).map((x) => ({
               id: x.id,
               text: x.name,
            }));

            if (!query) return options;

            const q = query.toLowerCase();
            return options.filter((x) => x.text.toLowerCase().includes(q));
         } catch (error) {
            console.error(error);
            showErrorToast('Greška prilikom učitavanja usluga');
            return [];
         }
      }

      async addOrEditCustomerAction() {
         this.store.set(m.formVisited, true);

         if (this.store.get(m.formInvalid)) return;

         this.store.set(m.saving, true);

         try {
            const customerAction = this.store.get(m.customerAction);

            if (actionId) {
               await updateCustomerAction(actionId, customerAction);
               showSuccessToast('Usluga je uspješno izmijenjena');
            } else {
               await createCustomerAction(customerAction);
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
