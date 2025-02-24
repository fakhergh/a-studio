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
            className={`flex bg-white border border-gray-200 focus:outline-none font-medium rounded-lg w-8 h-8 items-center justify-center me-2 ${disabled ? 'cursor-default' : 'hover:bg-gray-100 cursor-pointer'}`}
            {...props}
        >
            {props.icon}
        </button>
    );
}
