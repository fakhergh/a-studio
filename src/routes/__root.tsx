import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Fragment } from 'react';

import { NavBar } from '@/components/NavBar/NavBar';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <Fragment>
            <NavBar />
            <Outlet />
            <TanStackRouterDevtools />
        </Fragment>
    );
}
