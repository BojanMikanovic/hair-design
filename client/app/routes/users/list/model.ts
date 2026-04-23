import { createAccessorModelProxy } from 'cx/data';
import { UserResponse } from '../../../api/UserApi';

export type { UserResponse };

export interface Model {
   $page: {
      users: UserResponse[];
      loading: boolean;
      selected: string | null;
      searchQuery: string;
      sortField: string;
      sortDirection: string;
   };
}

export const { $page } = createAccessorModelProxy<Model>();
