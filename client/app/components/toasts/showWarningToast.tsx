import { Toast } from 'cx/widgets';

export function showWarningToast(infoMessage: any, timeout: number = 4000, placement = 'top') {
   let msg = infoMessage.message || infoMessage || 'Warning message';

   let toastItems = (
      <cx>
         <div class="flex flex-col">
            <div className="toast-title" text="Warning" />
            <div innerHtml={msg} />
         </div>
      </cx>
   );

   Toast.create({
      children: (
         <cx>
            <div>{toastItems}</div>
         </cx>
      ),
      timeout,
      mod: 'warning',
      style: 'max-width: 450px',
      placement,
   }).open();
}
