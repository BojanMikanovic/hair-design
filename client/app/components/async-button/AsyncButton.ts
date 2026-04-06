import { Widget } from 'cx/src/core';
import { ButtonProps } from 'cx/widgets';

interface AsyncButtonProps extends ButtonProps {
   busyText?: string;
   errorHandling?: 'none' | 'toast' | 'console' | 'alert';
}

export class AsyncButton extends Widget<AsyncButtonProps> {}
