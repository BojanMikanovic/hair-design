import { DELETE, GET, POST, PUT } from './util/methods';

const serviceId = 'Customers';

export function getAllCustomers() {
   return GET(serviceId);
}

export function getCustomerById(id: string) {
   return GET(`${serviceId}/${id}`);
}

export function createCustomer(data: any) {
   return POST(serviceId, data);
}

export function updateCustomer(id: string, data: any) {
   return PUT(`${serviceId}/${id}`, data);
}

export function deleteCustomer(id: string) {
   return DELETE(`${serviceId}/${id}`);
}
