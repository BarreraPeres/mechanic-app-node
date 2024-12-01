import { Clock } from 'lucide-react';
import { useState, forwardRef, type ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// Definindo as classes para o TimePicker com variantes usando tailwind-variants
const timePicker = tv({
    base: 'w-full rounded-lg bg-zinc-900 border border-gray-300 p-2 group-hover:bg-emerald-800 ring-emerald-800',

    variants: {
        variant: {
            primary: 'bg-zinc-900 text-white group  ',
            secondary: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 ring-zinc-900',
        },
        size: {
            default: 'p-2',
            sm: 'px-3 py-1.5',
        },
    },

    defaultVariants: {
        variant: 'primary',
        size: 'default',
    },
});

type TimePickerProps = ComponentProps<'div'> & VariantProps<typeof timePicker> & {
    onTimeChange?: (time: string) => void;
    labelSetButton?: string;
    labelClearButton?: string;
    initialTime?: string;
};

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
    ({ className, variant, size, onTimeChange, labelSetButton = "Set", labelClearButton = "Clear", initialTime = "12:00",
        ...props }, ref) => {
        const [time, setTime] = useState(initialTime);
        const [showPicker, setShowPicker] = useState(false);

        const handleTimeChange = (newTime: string) => {
            setTime(newTime);
            if (onTimeChange) {
                onTimeChange(newTime);
            }
        };

        return (
            <div className="relative group">
                <div {...props} ref={ref} className={timePicker({ variant, size, className })}>
                    <div className="bg-zinc-900 flex w-full mx-auto items-center space-x-2 group-hover:bg-emerald-800 ring-emerald-800">
                        <Clock size={20} color="gray" />
                        <button
                            type='button'
                            className="w-full rounded-lg border border-gray-500 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 group-hover:bg-emerald-800 ring-emerald-800 z"
                            onClick={() => setShowPicker(!showPicker)}
                        >
                            {time}
                        </button>
                    </div>
                    {showPicker && (
                        <div className="absolute z-50 mt-4 bg-zinc-900 p-4 mx-14 shadow-lg rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Horas */}
                                <div>
                                    <label className="block text-sm text-white mb-1">Horas</label>
                                    <select
                                        className="w-full rounded-lg bg-zinc-800 text-white px-2 py-1"
                                        value={time.split(':')[0]}
                                        onChange={(e) => handleTimeChange(`${e.target.value}:${time.split(':')[1]}`)}
                                    >
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={String(i).padStart(2, '0')}>
                                                {String(i).padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Minutos */}
                                <div>
                                    <label className="block text-sm text-white mb-1">Minutos</label>
                                    <select
                                        className="w-full rounded-lg bg-zinc-800 text-white px-2 py-1"
                                        value={time.split(':')[1]}
                                        onChange={(e) => handleTimeChange(`${time.split(':')[0]}:${e.target.value}`)}
                                    >
                                        {Array.from({ length: 60 }, (_, i) => (
                                            <option key={i} value={String(i).padStart(2, '0')}>
                                                {String(i).padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex space-x-2">
                                <button
                                    className="w-full rounded-lg px-5 py-2 text-center text-sm font-medium bg-emerald-800 text-zinc-300 hover:bg-emerald-700"
                                    onClick={() => setShowPicker(false)}
                                >
                                    Definir
                                </button>
                                <button
                                    className="w-full rounded-lg px-5 py-2 text-center text-sm font-medium bg-zinc-900 text-zinc-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                    onClick={() => handleTimeChange('12:00')}
                                >
                                    Limpar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

TimePicker.displayName = 'TimePicker';
