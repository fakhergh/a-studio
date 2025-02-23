import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { useGetUsersQuery } from '@/services/apiSlice';

export const Route = createFileRoute('/users')({
    component: RouteComponent,
});

function RouteComponent() {
    const [page] = useState(1);
    const [limit, setLimit] = useState(10);

    const { status } = useGetUsersQuery({ skip: (page - 1) * limit, limit });

    return (
        <div>
            Hello /users
            <h1>{status}</h1>
            <div className="flex flex-col gap-1">
                <button onClick={() => setLimit(5)}>5</button>
                <button onClick={() => setLimit(10)}>10</button>
                <button onClick={() => setLimit(15)}>15</button>
            </div>
        </div>
    );
}
