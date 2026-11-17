import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className,
  required,
  ...props
}) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        className={cn(
          'w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs md:text-sm text-slate-900 font-medium transition-all focus:outline-none focus:ring-2 focus:bg-white',
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-sky-500 focus:ring-sky-500/20',
          className
        )}
        required={required}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
};
