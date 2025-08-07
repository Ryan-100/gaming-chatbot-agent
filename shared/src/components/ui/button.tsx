import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';
import Loading from './loading';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white text-sm font-medium shadow hover:opacity-50',
        destructive: 'bg-surface-error text-white shadow-sm  hover:opacity-50',
        success: 'bg-surface-success text-white shadow-sm  hover:opacity-50',
        outline:
          'border border-border-secondary bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-surface-secondary border border-border-secondary text-text-primary shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4',
      },
      size: {
        default: 'h-[40px] px-4 py-2',
        sm: 'h-[30px] rounded-md px-6 text-xs min-w-[100px]',
        lg: 'w-full py-2 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          (loading || disabled) && 'opacity-50'
        )}
        ref={ref}
        {...props}
        disabled={loading || disabled}
      >
        {loading ? <Loading color="white" size="20" /> : children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
