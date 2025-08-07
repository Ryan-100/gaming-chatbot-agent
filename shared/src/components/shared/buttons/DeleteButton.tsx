import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { Button } from '../../ui/button';
import { Icons } from '../../ui/icons';
import { Text } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import { checkPermission } from '../../../utils/checkPermission';

interface DeleteButtonProps {
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
  disable?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  name = 'Delete',
  hideIcon = true,
  iconRender,
  className,
  textClassName,
  iconClassName,
  onClick,
  href,
  variant = 'default',
  size = 'sm',
  disable = false,
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
                className={cn(className, '')}
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
              className={cn(className, '')}
              onClick={onClick}
              variant={variant}
              size={size}
              disabled={disable}
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
export default DeleteButton;
