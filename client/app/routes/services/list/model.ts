import { createAccessorModelProxy } from 'cx/data';

export interface ServiceResponse {
   id: string;
   name: string;
   createdAt: string;
}

export interface Model {
   $page: {
      services: ServiceResponse[];
      loading: boolean;
      selected: string | null;
      searchQuery: string;
      sortField: string;
      sortDirection: string;
   };
}

export const { $page } = createAccessorModelProxy<Model>();
