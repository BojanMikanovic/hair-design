import { Bind, bind, ClassProp, createFunctionalComponent, Prop } from 'cx/ui';
import { Icon, Link, PureContainer } from 'cx/widgets';
import { Logo2 } from '../components/Logo2';
import Controller from './Controller';

interface NavItemProps {
   text?: Prop<string>;
   href?: string;
   tooltip?: string;
   onClick?: (e: any, instance: any) => void;
   className?: ClassProp;
   icon?: string;
   badge?: Prop<string>;
   expanded?: Bind;
}

const NavItem = createFunctionalComponent(
   ({ text, href, tooltip, onClick, className, icon, badge, expanded }: NavItemProps) => (
      <cx>
         <Link
            href={href}
            url={bind('url')}
            class="hover:bg-gray-100 flex items-center px-3 py-3 text-gray-800 relative font-semibold whitespace-nowrap text-opacity-70 text-[15px] border-l-[3px] border-transparent cursor-pointer"
            className={className}
            activeClass="bg-blue-100! border-blue-500! text-blue-500! opacity-100!"
            tooltip={tooltip}
            onClick={(e, instance) => {
               instance.store.set('nav.mobileOpen', false);
               if (onClick) onClick(e, instance);
            }}
            match="subroute"
         >
            <Icon name={icon} class="w-7 h-7 ml-3 mr-3 opacity-70" />
            <div text={text} class="grow" />
            <div text={badge} visible={!!badge} class="text-xs bg-black bg-opacity-20 rounded-full px-3 py-1" />
            <Icon
               name="drop-down"
               class="w-5 h-5 mr-2 transform transition-all opacity-80"
               visible={!!expanded}
               className={{
                  'rotate-180': expanded,
               }}
            />
         </Link>
      </cx>
   ),
);

interface GroupItemProps extends NavItemProps {
   children?: any | any[];
}

const GroupItem = createFunctionalComponent(
   ({ text, href, tooltip, className, icon, badge, children, expanded }: GroupItemProps) => (
      <cx>
         <NavItem
            href={href}
            text={text}
            tooltip={tooltip}
            className={className}
            icon={icon}
            badge={badge}
            onClick={(e, { store }) => {
               e.preventDefault();
               store.toggle(expanded.bind);
            }}
            expanded={expanded}
         />
         <PureContainer visible={expanded}>{children}</PureContainer>
      </cx>
   ),
);

interface ChildItemProps {
   text?: string;
   href?: string;
   badge?: Prop<string>;
}

const ChildItem = createFunctionalComponent(({ text, href, badge }: ChildItemProps) => (
   <cx>
      <NavItem href={href} text={text} className="pl-16! opacity-80" badge={badge} />
   </cx>
));

const NavigationContent = createFunctionalComponent(() => (
   <cx>
      <div class="px-6 py-3 text-gray-400 text-sm">Main Menu</div>
      <NavItem text="Customers" icon="users" href="~/customers" />
   </cx>
));

export const CheckerLayout = createFunctionalComponent(({ children }: { children: any }) => (
   <cx>
      <div class="h-full flex" controller={Controller}>
         <div class="hidden lg:flex w-[250px] border-r flex-col">
            <div class="border-b py-2 px-4 lg:px-6 flex items-center">
               <Logo2 />
            </div>

            <div class="pt-3 overflow-y-auto flex-1">
               <NavigationContent />
            </div>
         </div>

         <div class="flex-1 min-h-0 overflow-hidden flex flex-col">{children}</div>
      </div>
   </cx>
));
