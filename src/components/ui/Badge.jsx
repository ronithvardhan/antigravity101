import { twMerge } from 'tailwind-merge';

export function Badge({ children, className, variant = 'default', ...props }) {
    const variants = {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        primary: 'bg-primary/10 text-primary border border-primary/20',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    };

    return (
        <span
            className={twMerge(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
