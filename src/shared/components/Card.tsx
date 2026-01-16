import { type ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('bg-white border-2 border-dashboard-border rounded-xl shadow-lg p-6', className)}>
      {title && (
        <div className="mb-6 pb-3 border-b-2 border-automotive-200">
          <h3 className="text-xl font-bold text-automotive-600 tracking-wide">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}
