import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { NavBar, NavBarItemProps } from '@/components/NavBar/NavBar';
import { Routes } from '@/constants';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : lazy(() =>
              // Lazy load in development
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
                  // For Embedded Mode
                  // default: res.TanStackRouterDevtoolsPanel
              })),
          );

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
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
        </div>
    );
}
