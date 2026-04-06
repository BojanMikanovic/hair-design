import { Toast } from 'cx/widgets';

export function showSuccessToast(infoMessage: any, timeout: number = 3000, placement = 'top') {
   let msg = infoMessage?.message || infoMessage || 'Success';

   Toast.create({
      children: (
         <cx>
            <div class="flex items-start gap-3 px-4 py-3">
               <div class="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white font-bold">
                  ✓
               </div>

               <div class="flex flex-col">
                  <div class="text-sm font-semibold leading-5">Success</div>
                  <div class="text-sm leading-5 opacity-95" text={msg} />
               </div>
            </div>
         </cx>
      ),
      timeout,
      mod: 'success',
      placement,
      style: 'min-width: 320px; max-width: 420px;',
      pad: false,
   }).open();
}
