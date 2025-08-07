import Link from 'next/link';
import { cn } from '../../../utils/cn';
import { Button } from '../../ui/button';
import { Icons } from '../../ui/icons';
import { Text } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import { checkPermission } from '../../../utils/checkPermission';

interface EditButtonProps {
  name?: string;
  hideIcon?: boolean;
  iconRender?: () => React.ReactNode | null;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  onClick?: () => void;
  loading?: boolean;
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

const EditButton: React.FC<EditButtonProps> = ({
  name = 'Edit',
  hideIcon = true,
  iconRender,
  className,
  textClassName,
  iconClassName,
  onClick,
  href,
  variant = 'success',
  size = 'sm',
  loading = false,
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
              loading={loading}
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
export default EditButton;
