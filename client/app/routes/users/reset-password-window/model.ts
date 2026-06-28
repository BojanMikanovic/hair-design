import { createAccessorModelProxy } from 'cx/data';

export interface ResetPasswordFormData {
   newPassword: string;
   confirmPassword: string;
}

export interface Model {
   form: ResetPasswordFormData;
   saving: boolean;
   formInvalid: boolean;
   formVisited: boolean;
   passwordsMatch: boolean;
}

const m = createAccessorModelProxy<Model>();

export default m;
