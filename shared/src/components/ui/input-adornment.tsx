import * as React from 'react';
import { cn } from '../../utils/cn';
import { Box } from '@radix-ui/themes';

export type InputAdornmentProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    endAdornment?: string;
  };

const InputAdornment = React.forwardRef<HTMLInputElement, InputAdornmentProps>(
  ({ className, type, endAdornment, ...props }, ref) => {
    return (
      <Box className="relative h-fit">
        <input
          type={type}
          className={cn(
            'flex h-[40px] w-full rounded-md border border-input bg-surface-secondary px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <Box className="capitalize absolute right-4 top-1/2 transform -translate-y-1/2 text-sm">
            {endAdornment}
          </Box>
        )}
      </Box>
    );
  }
);

InputAdornment.displayName = 'InputAdornment';

export { InputAdornment };
