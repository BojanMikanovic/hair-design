import { Toast } from 'cx/widgets';

export function showErrorToast(err, title = 'Error', timeout = 4000, placement = 'top') {
   let msg = err.message || err || 'An error has occurred';

   let toastItems = (
      <cx>
         <div class="flex flex-col">
            <div className="toast-title" text={title} />

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
      mod: 'error',
      style: 'max-width: 450px',
      placement,
   }).open();
}
