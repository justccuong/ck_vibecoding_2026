import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'emerald' | 'amber' | 'rose' | 'sky' | 'indigo' | 'slate';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'slate',
  children,
  className,
  icon,
}) => {
  const variants = {
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    sky: 'bg-sky-100 text-sky-800 border-sky-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-bold border',
        variants[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
};
