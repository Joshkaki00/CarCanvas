import { type ChangeEvent } from 'react';
import { cn } from '@shared/utils/cn';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  className,
}: SliderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm font-semibold text-automotive-600 dark:text-automotive-400">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                   [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-automotive-500 
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                   [&::-moz-range-thumb]:bg-automotive-500 [&::-moz-range-thumb]:border-0 
                   [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
