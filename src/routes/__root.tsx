import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Fragment } from 'react';

import { NavBar, NavBarItemProps } from '@/components/NavBar/NavBar';

export const Route = createRootRoute({
    component: RootComponent,
});

const navBarItems: Array<NavBarItemProps> = [
    { to: '/users', title: 'Users' },
    { to: '/products', title: 'Products' },
];

function RootComponent() {
    return (
        <Fragment>
            <NavBar items={navBarItems} />
            <Outlet />
            <TanStackRouterDevtools />
        </Fragment>
    );
}
