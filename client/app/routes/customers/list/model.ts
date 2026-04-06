import { createAccessorModelProxy } from 'cx/data';

export interface CustomerResponse {
   id: string;
   firstName: string;
   lastName: string;
   phone?: string | null;
   email?: string | null;
   notes?: string | null;
   createdAt: string;
}

export interface Model {
   $page: {
      customers: CustomerResponse[];
      loading: boolean;
      selected: string | null;
      searchQuery: string;
      sortField: string;
      sortDirection: string;
   };
}

export const { $page } = createAccessorModelProxy<Model>();
