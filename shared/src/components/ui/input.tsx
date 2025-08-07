import * as React from 'react';
import { cn } from '../../utils/cn';
import { Icons } from './icons';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  postfix?: React.ReactNode;
  preFix?: React.ReactNode; // i had to use preFix instead of prefix since nextjs know prefix as string
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, preFix, postfix, disabled, ...props }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      if (!disabled) {
        setPasswordVisible(!isPasswordVisible);
      }
    };

    return (
      <div className="relative w-full flex items-center">
        <input
          type={isPasswordVisible ? 'text' : type}
          className={cn(
            'flex h-[40px] w-full rounded-md border border-input bg-surface-secondary px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            preFix && 'pl-[30px]',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className={cn(
              'absolute right-3 top-1/2 transform -translate-y-1/2',
              { 'cursor-not-allowed opacity-50': disabled }
            )}
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {!isPasswordVisible ? (
              <Icons.EyeOff className="w-4 h-4 text-text-primary" />
            ) : (
              <Icons.Eye className="w-4 h-4 text-text-primary" />
            )}
          </button>
        )}
        {preFix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {preFix}
          </div>
        )}
        {postfix && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {postfix}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
