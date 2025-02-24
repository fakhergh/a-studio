import { useMemo } from 'react';

import { IconChevronLeft } from '@/icons/IconChevronLeft';
import { IconChevronRight } from '@/icons/IconChevronRight';

export interface PaginationProps {
    page?: number;
    totalPages: number;
    onPageChange?: (p: number) => void;
}

export function Pagination({
    page = 1,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const steps = useMemo(() => {
        if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);
        if (page <= 3) return [1, 2, 3, '...', totalPages];
        if (page >= totalPages - 2)
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', page - 1, page, page + 1, '...', totalPages];
    }, [page, totalPages]);

    return (
        <ul className="flex items-center justify-center space-x-2">
            <li>
                <button
                    className={`w-9 h-9 p-2 border border-gray-200 rounded-lg transition ease-in-out ${page === 1 ? 'cursor-default bg-gray-50' : 'hover:bg-gray-100 cursor-pointer'}`}
                    onClick={() => onPageChange?.(page > 1 ? page - 1 : page)}
                    disabled={page === 1}
                >
                    <span className="flex items-center justify-center">
                        <IconChevronLeft className="w-3" />
                    </span>
                </button>
            </li>
            {steps.map((step, i) => (
                <li key={i}>
                    {step === '...' ? (
                        <span className="p-2 cursor-default">{step}</span>
                    ) : (
                        <button
                            className={`w-9 h-9 p-2 text-sm rounded-lg cursor-pointer ${step === page ? 'bg-yellow text-white' : 'border border-gray-200 hover:bg-gray-100 transition ease-in-out'}`}
                            onClick={() => onPageChange?.(step as number)}
                        >
                            <span className="flex items-center justify-center">
                                {step}
                            </span>
                        </button>
                    )}
                </li>
            ))}
            <li>
                <button
                    className={`w-9 h-9 p-2 border border-gray-200 rounded-lg transition ease-in-out ${page === totalPages ? 'cursor-default bg-gray-50' : 'hover:bg-gray-100 cursor-pointer'}`}
                    onClick={() =>
                        onPageChange?.(page < totalPages ? page + 1 : page)
                    }
                    disabled={page === totalPages}
                >
                    <span className="flex items-center justify-center">
                        <IconChevronRight className="w-3" />
                    </span>
                </button>
            </li>
        </ul>
    );
}
