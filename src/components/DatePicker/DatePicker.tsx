import { ChangeEvent } from 'react';

export interface DatePickerProps {
    label?: string;
    value?: string;
    onDateChange?: (date: string) => void;
}

export function DatePicker({ label, value, onDateChange }: DatePickerProps) {
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        onDateChange?.(e.target.value);
    };

    return (
        <label className="flex flex-col w-full relative z-[2]">
            <span className="text-xs text-black/70">{label}</span>
            <input
                type="date"
                value={value}
                onChange={handleDateChange}
                className="border border-gray-100 rounded-lg px-2 h-9 focus:outline-none"
            />
        </label>
    );
}
