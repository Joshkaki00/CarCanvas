import { type ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('bg-dashboard-card border border-dashboard-border rounded-xl shadow-dashboard p-6 backdrop-blur-sm', className)}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-automotive-500 font-digital tracking-wide">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
