import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, ...props }: InputProps) {
    return (
        <label className="flex flex-col w-full">
            <span className="text-xs text-black/70">{label}</span>
            <input
                className="h-9 bg-white border border-gray-100 text-sm rounded-lg px-2 text-black focus:outline-none"
                {...props}
            />
        </label>
    );
}
