import { Store } from 'cx/data';
import { History, Widget, startHotAppLoop, enableCultureSensitiveFormatting } from 'cx/ui';
import { Timing, Debug } from 'cx/util';

import { renderThemeVariables, defaultPreset } from 'cx-theme-variables';

// Apply the default preset
renderThemeVariables({ ...defaultPreset, gridBorderRadius: '0' });

interface InitUser {
   email: string;
   firstName: string;
   lastName: string;
   initials: string;
   pictureUrl: string | null;
}

declare global {
   interface Window {
      store: Store;
      initData?: { user: InitUser | false };
   }
}

enableCultureSensitiveFormatting();

//store
const initUser = window.initData?.user;
const store = new Store({
   data: {
      user: initUser || null,
   },
});

//Remove in the latter stage of the project
window.store = store;

//routing
//Url.setBaseFromScript("app*.js");
History.connect(store, 'url');

//debug
Widget.resetCounter();
Timing.enable('app-loop');
Debug.enable('app-data');

//app loop
import Routes from './routes';

startHotAppLoop(module, document.getElementById('app')!, store, Routes);
