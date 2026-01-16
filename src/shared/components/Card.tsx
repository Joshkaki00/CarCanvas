import { type ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('bg-dashboard-card/90 border-2 border-dashboard-border rounded-xl shadow-dashboard p-6 backdrop-blur-sm', className)}>
      {title && (
        <div className="mb-6 pb-3 border-b border-dashboard-border">
          <h3 className="text-xl font-bold text-automotive-500 tracking-wide">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}
