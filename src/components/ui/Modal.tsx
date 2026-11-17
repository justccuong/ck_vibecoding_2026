import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div
        className={cn(
          'bg-white rounded-3xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl relative',
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-3">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          {description && <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>}
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
