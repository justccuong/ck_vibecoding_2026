import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20',
    secondary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200',
    ghost: 'hover:bg-slate-100 text-slate-600',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 min-h-[36px]',
    md: 'text-xs md:text-sm px-3.5 py-2 min-h-[44px]', // Chuẩn 44px touch target
    lg: 'text-sm md:text-base px-5 py-2.5 min-h-[48px]',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};
