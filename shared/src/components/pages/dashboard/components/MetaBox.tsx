import { Flex, Text } from '@radix-ui/themes';
import { Image } from '../../../ui/image';
import { Icons } from '../../../ui/icons';
import Link from 'next/link';

interface MetaBoxProps {
  label: string;
  value: string | number | undefined;
  icon: string;
  path: string;
}

export const MetaBox = ({ label, value, icon, path }: MetaBoxProps) => {
  return (
    <Link href={path} className="flex-1 w-full">
      <Flex
        className="bg-neutral-50 p-4 rounded-lg gap-x-2 cursor-pointer shadow w-full min-w-[200px]"
        align={'center'}
        justify={'between'}
      >
        <Flex align="center" gap="2">
          <Image src={icon} width={48} height={48} alt="meta icon" />
          <Flex direction={'column'}>
            <Text className="font-bold text-lg"> {value} </Text>
            <p className="text-sm truncate max-w-full"> {label} </p>
          </Flex>
        </Flex>
        {/* static icon */}
        <Icons.Right width={16} height={16} />
      </Flex>
    </Link>
  );
};
