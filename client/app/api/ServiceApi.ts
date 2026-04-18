import { DELETE, GET, POST, PUT } from './util/methods';

const serviceId = 'Services';

export function getAllServices() {
   return GET(serviceId);
}

export function getServiceById(id: string) {
   return GET(`${serviceId}/${id}`);
}

export function createService(data: any) {
   return POST(serviceId, data);
}

export function updateService(id: string, data: any) {
   return PUT(`${serviceId}/${id}`, data);
}

export function deleteService(id: string) {
   return DELETE(`${serviceId}/${id}`);
}
