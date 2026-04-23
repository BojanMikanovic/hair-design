import { ContentResolver, FirstVisibleChildLayout, bind, expr } from 'cx/ui';
import { DocumentTitle, RedirectRoute, Route } from 'cx/widgets';
import { CheckerLayout } from '../layout/CheckerLayout';
import SignIn from './pages/sign-in';
import Customers from './customers/list';
import CustomerActions from './customer-actions/list';
import Services from './services/list';
import Users from './users/list';

export default (
   <cx>
      <FirstVisibleChildLayout>
         <SignIn visible={expr('!{user}')} />

         <RedirectRoute route="~/" redirect="~/customers" url={bind('url')} />

         <CheckerLayout>
            <Route route="~/customers" url={bind('url')} prefix>
               <Customers />
            </Route>
            <Route route="~/customer-actions" url={bind('url')} prefix>
               <CustomerActions />
            </Route>
            <Route route="~/services" url={bind('url')} prefix>
               <Services />
            </Route>
            <Route route="~/users" url={bind('url')} prefix>
               <Users />
            </Route>
         </CheckerLayout>
      </FirstVisibleChildLayout>

      <ContentResolver
         visible={expr('!!{user}')}
         params={1 as unknown}
         onResolve={() => import(/* webpackChunkName: "user-routes" */ './user').then((x) => x.default)}
      />
      <ContentResolver
         params={1 as unknown}
         onResolve={() => import(/* webpackChunkName: "overlays" */ '../overlays').then((x) => x.default)}
      />
      <DocumentTitle append value="Hair Design" separator=" | " />
   </cx>
);
