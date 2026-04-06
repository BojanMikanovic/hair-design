import { DELETE, GET, POST, PUT } from './util/methods';

const serviceId = 'CustomerActions';

export function getAllCustomerActions() {
   return GET(serviceId);
}

export function getCustomerActionById(id: string) {
   return GET(`${serviceId}/${id}`);
}

export function createCustomerAction(data: any) {
   return POST(serviceId, data);
}

export function updateCustomerAction(id: string, data: any) {
   return PUT(`${serviceId}/${id}`, data);
}

export function deleteCustomerAction(id: string) {
   return DELETE(`${serviceId}/${id}`);
}
