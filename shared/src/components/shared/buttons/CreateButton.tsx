'use client';
import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { Button } from '../../ui/button';
import { Icons } from '../../ui/icons';
import { Text } from '@radix-ui/themes';
import { getUserInfo } from '../../../utils/auth';
import { usePathname } from 'next/navigation';
import { checkPermission } from '../../../utils/checkPermission';

interface CreateButtonProps {
  name?: string;
  hideIcon?: boolean;
  iconRender?: () => React.ReactNode | null;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  onClick?: () => void;
  href?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'secondary'
    | 'success';
  size?: 'default' | 'sm';
}

const CreateButton: React.FC<CreateButtonProps> = ({
  name = 'Create',
  hideIcon = false,
  iconRender,
  className,
  textClassName,
  iconClassName,
  onClick,
  href,
  variant = 'default',
  size = 'default',
}) => {
  const pathname = usePathname();
  const action = checkPermission({ pathname: pathname });

  return (
    <div>
      {action === 'write' ? (
        <div>
          {href ? (
            <Link href={href}>
              <Button
                className={cn(className, 'flex items-center space-x-2 text-sm')}
                variant={variant}
                size={size}
              >
                {!hideIcon && (
                  <Icons.Plus className={cn(iconClassName, 'text-base')} />
                )}
                {iconRender && iconRender()}
                <Text className={cn(textClassName, '')}>{name}</Text>
              </Button>
            </Link>
          ) : (
            <Button
              className={cn(className, 'flex items-center space-x-2 text-sm')}
              onClick={onClick}
              variant={variant}
              size={size}
            >
              {!hideIcon && (
                <Icons.Plus className={cn(iconClassName, 'text-base')} />
              )}
              {iconRender && iconRender()}
              <Text className={cn(textClassName, '')}>{name}</Text>
            </Button>
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
export default CreateButton;
