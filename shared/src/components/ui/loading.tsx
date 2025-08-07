import { Flex } from '@radix-ui/themes';
import { BiLoaderCircle } from 'react-icons/bi';
import { cn } from '../../../src/utils/cn';

const Loading = (props: { color?: string; size?: string }) => {
  return (
    <Flex
      justify="center"
      align="center"
      className={cn(
        'w-full h-full animate-spin text-base font-bold',
        props.color ? `text-${props.color}` : 'text-primary'
      )}
    >
      <BiLoaderCircle />
    </Flex>
  );
};

export default Loading;

// Default values shown
