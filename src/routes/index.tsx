import { createFileRoute, redirect } from '@tanstack/react-router';

import { Routes } from '@/constants';

export const Route = createFileRoute('/')({
    component: RouteComponent,
    loader: () => {
        redirect({
            to: Routes.USERS,
            throw: true,
        });
    },
});

function RouteComponent() {
    return null;
}
