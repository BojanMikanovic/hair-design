import { createAccessorModelProxy } from 'cx/data';

export interface ServiceUpdateDTO {
   id?: string;
   name: string;
}

export interface Model {
   service: ServiceUpdateDTO;
   saving: boolean;
   formInvalid: boolean;
   formVisited: boolean;
}

const m = createAccessorModelProxy<Model>();

export default m;
