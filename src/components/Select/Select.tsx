export interface SelectProps {
    options: Array<string | number>;
    value?: string | number;
    onChange?: (value: number | string) => void;
    className?: string;
}

export function Select({
    options,
    value,
    onChange,
    className,
    ...props
}: SelectProps) {
    return (
        <select
            {...props}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`bg-white border border-gray-200 rounded-lg p-2 text-gray-800 focus:outline-none ${className}`}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
