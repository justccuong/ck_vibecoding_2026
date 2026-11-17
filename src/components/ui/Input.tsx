import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
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
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full py-2 bg-slate-50 border rounded-xl text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:bg-white',
            icon ? 'pl-9 pr-3' : 'px-3',
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 focus:border-sky-500 focus:ring-sky-500/20',
            className
          )}
          required={required}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
};
