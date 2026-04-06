import { createAccessorModelProxy } from 'cx/data';

export interface CustomerUpdateDTO {
   id?: string;
   firstName: string;
   lastName: string;
   phone?: string | null;
   email?: string | null;
   notes?: string | null;
}

export interface Model {
   customer: CustomerUpdateDTO;
   saving: boolean;
   formInvalid: boolean;
   formVisited: boolean;
}

const m = createAccessorModelProxy<Model>();

export default m;
