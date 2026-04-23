import { POST } from './util/methods';

export function logout(): Promise<unknown> {
   return POST('Auth/logout', {});
}
