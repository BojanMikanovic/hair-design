import { ClassProp } from 'cx/src/core';
import { CxProps } from 'cx/ui';

interface FormProps {
   onSubmit: string | Function;
   children: any;
   id?: string;
   className?: string;
   class?: ClassProp;
   layout?: CxProps;
}

export const Form = ({ children, onSubmit, id, className, class: _class, layout }: FormProps) => (
   <cx>
      <form onSubmit={onSubmit as any} id={id} className={className} layout={layout}>
         {children}
      </form>
   </cx>
);
