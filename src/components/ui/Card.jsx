import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
    return (
        <div
            className={twMerge(
                'bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className, ...props }) {
    return (
        <div className={twMerge('p-4 border-b border-gray-100 dark:border-gray-700', className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className, ...props }) {
    return (
        <h3 className={twMerge('text-lg font-semibold text-gray-900 dark:text-gray-100', className)} {...props}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className, ...props }) {
    return (
        <div className={twMerge('p-4', className)} {...props}>
            {children}
        </div>
    );
}
