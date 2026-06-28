import { createAccessorModelProxy } from 'cx/data';

export interface CustomerActionResponse {
   id: string;
   customerId: string;
   customerName: string;
   serviceId: string;
   serviceName: string;
   date: string;
   note?: string | null;
   colorNote?: string | null;
   price: number;
   createdAt: string;
}

export interface Model {
   $page: {
      actions: CustomerActionResponse[];
      loading: boolean;
      selected: string | null;
      searchQuery: string;
      customerId: string | null;
      customerName: string | null;
      sortField: string;
      sortDirection: string;
      serviceId: string | null;
      serviceName: string | null;
   };
}

export const { $page } = createAccessorModelProxy<Model>();
