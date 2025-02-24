export interface SelectProps {
    label?: string;
    value?: string | number;
    options: Array<string | number>;
    onChange?: (value: number | string) => void;
}

export function Select({
    label,
    value,
    options,
    onChange,
    ...props
}: SelectProps) {
    return (
        <label className="flex flex-col w-full">
            <span className="text-xs text-black/70">{label}</span>
            <select
                {...props}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className={`h-9 bg-white border border-gray-100 text-sm rounded-lg px-2 text-black focus:outline-none`}
            >
                <option value="" />
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}
