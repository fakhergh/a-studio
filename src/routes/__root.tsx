import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { NavBar, NavBarItemProps } from '@/components/NavBar/NavBar';
import { Routes } from '@/constants';

export const Route = createRootRoute({
    component: RootComponent,
});

const navBarItems: Array<NavBarItemProps> = [
    { to: Routes.USERS, title: 'Users' },
    { to: Routes.PRODUCTS, title: 'Products' },
];

function RootComponent() {
    const location = useLocation();

    return (
        <div className="flex flex-col w-screen h-screen">
            <NavBar currentPath={location.pathname} items={navBarItems} />
            <div className="flex flex-1 p-4 overflow-hidden">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </div>
    );
}
