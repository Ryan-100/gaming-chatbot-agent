import { Flex } from '@radix-ui/themes';
import { BiLoaderCircle } from 'react-icons/bi';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-primary">
      <Flex
        justify="center"
        align="center"
        className={'animate-spin text-base font-bold text-white mt-2'}
      >
        <BiLoaderCircle />
      </Flex>
    </div>
  );
}
