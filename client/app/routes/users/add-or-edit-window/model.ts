import { createAccessorModelProxy } from 'cx/data';

export interface UserFormData {
   id?: string;
   email: string;
   password?: string;
   firstName: string;
   lastName: string;
   pictureUrl?: string | null;
}

export interface Model {
   user: UserFormData;
   saving: boolean;
   formInvalid: boolean;
   formVisited: boolean;
}

const m = createAccessorModelProxy<Model>();

export default m;
