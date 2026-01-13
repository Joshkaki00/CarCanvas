import { type ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6', className)}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
