import { Toast } from 'cx/widgets';

export function showSuccessToast(infoMessage: any, timeout: number = 4000, placement = 'top') {
   let msg = infoMessage.message || infoMessage || 'Info message';

   let toastItems = (
      <cx>
         <div class="flex flex-col">
            <div className="toast-title" text="Success" />
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
      mod: 'success',
      style: 'max-width: 450px',
      placement,
   }).open();
}
