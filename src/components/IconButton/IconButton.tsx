import { ReactNode } from 'react';

export interface IconButtonProps {
    className?: string;
    icon: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

export function IconButton({ disabled, ...props }: IconButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={`bg-white border border-gray-200 focus:outline-none font-medium rounded-lg text-4xl p-1.5 text-center inline-flex items-center me-2 ${disabled ? 'cursor-default' : 'hover:bg-gray-100 cursor-pointer'}`}
            {...props}
        >
            {props.icon}
        </button>
    );
}
