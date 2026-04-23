import { showErrorToast } from '../../../util/toasts';

export default {
   async onSubmit(e: Event, { store }: { store: { getData: () => any; set: (k: string, v: unknown) => void } }) {
      e.preventDefault();
      const { invalid, email, password, rememberMe } = store.getData();
      if (invalid) {
         store.set('visited', true);
         return;
      }

      try {
         const res = await fetch('/api/Auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, rememberMe: !!rememberMe }),
         });

         if (res.status === 401) {
            showErrorToast('Pogrešan email ili lozinka.');
            return;
         }
         if (!res.ok) {
            showErrorToast('Prijava nije uspjela.');
            return;
         }

         window.location.reload();
      } catch (err) {
         console.error(err);
         showErrorToast('Prijava nije uspjela.');
      }
   },
};
