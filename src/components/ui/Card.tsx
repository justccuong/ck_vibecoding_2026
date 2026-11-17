import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-slate-300 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
