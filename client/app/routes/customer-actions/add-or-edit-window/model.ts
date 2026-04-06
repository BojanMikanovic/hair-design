import { createAccessorModelProxy } from 'cx/data';

export interface CustomerActionUpdateDTO {
   id?: string;
   customerId: string;
   customerName?: string | null;
   title: string;
   date: string;
   note?: string | null;
   colorNote?: string | null;
   price: number;
}

export interface Model {
   customerAction: CustomerActionUpdateDTO;
   saving: boolean;
   formInvalid: boolean;
   formVisited: boolean;
}

const m = createAccessorModelProxy<Model>();

export default m;
