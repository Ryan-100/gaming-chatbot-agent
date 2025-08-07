import React from 'react';

import { Box, Text } from '@radix-ui/themes';
import { cn } from '../../utils';

type Props = {
  status?: 'active' | 'unActive';
  title: string;
  onPress?: () => void;
};

const LineTabItem: React.FC<Props> = ({
  status = 'unActive',
  title = '',
  onPress,
}: Props) => {
  return (
    <Box
      className={cn(
        status == 'active'
          ? 'border-b-2 border-primary cursor-pointer'
          : 'cursor-pointer text-text-secondary'
      )}
      onClick={onPress}
    >
      <Text
        className={cn(status == 'active' ? 'text-primary' : '', 'text-[14px]')}
      >
        {title}
      </Text>
    </Box>
  );
};

export default LineTabItem;
