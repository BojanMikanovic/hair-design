import { BooleanProp } from 'cx/src/core';
import { DataProxy } from 'cx/ui';
import { Button, Icon, PureContainer, Text } from 'cx/widgets';
import { Suspense } from '../Suspense';

interface LoadingOverlayProps {
   status?: any;
   loading?: BooleanProp;
   onRetry?: () => void;
   onCancel?: () => void;
   children: any;
   icon?: string;
   loadingText?: string;
   error?: any;
   errorMessage?: string;
   style?: any;
   mod?: string;
   suspenseTimeout?: number;
}

export const LoadingOverlay = ({
   status,
   loading,
   onRetry,
   onCancel,
   children,
   icon = 'loading',
   loadingText = 'Loading...',
   error,
   errorMessage,
   style,
   mod,
   suspenseTimeout = 5000,
}: LoadingOverlayProps) => (
   <cx>
      <DataProxy
         data={{
            $status: status,
            $loading: loading,
         }}
         immutable
      >
         <PureContainer>
            <Suspense loading-expr="{$loading} || {$status} == 'loading'" timeout={suspenseTimeout}>
               {children}
            </Suspense>
            <div class="cxb-loading-overlay-container" mod={mod} if-expr="{$status} == 'error'">
               <div class="cxe-loading-overlay-error">
                  <Text value={errorMessage || error} />
                  <div class="error-buttons">
                     <Button
                        onClick={onCancel}
                        if={Boolean(onCancel)}
                        text={Boolean(onRetry) ? 'Cancel' : 'Dismiss'}
                        class="margin-right"
                     />
                     <Button mod="primary" onClick={onRetry} if={Boolean(onRetry)} text="Retry" />
                  </div>
               </div>
            </div>
            <div
               if-expr="{$status} != 'error'"
               mod={mod}
               class={{
                  'cxb-loading-overlay-container': true,
                  'cxs-animated': true,
                  on: { expr: "{$loading} || {$status} == 'loading'" },
               }}
               style={style}
            >
               <div class="cxe-loading-overlay-indicator">
                  <span>
                     <Icon
                        name={icon}
                        style={{
                           width: '24px',
                           height: '24px',
                        }}
                     />
                  </span>
                  <span text={loadingText} class="user-unselectable-text" />
               </div>
            </div>
         </PureContainer>
      </DataProxy>
   </cx>
);
