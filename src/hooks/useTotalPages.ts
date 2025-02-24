import { useEffect, useState } from 'react';

export function useTotalPages(total: number | undefined | null) {
    const [totalPage, setTotalPages] = useState<number | null | undefined>(
        total,
    );

    useEffect(() => {
        if (typeof total === 'number') {
            setTotalPages(total);
        }
    }, [total]);

    return totalPage;
}
