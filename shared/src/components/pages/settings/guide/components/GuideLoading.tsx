import React from 'react';
import { Box, Flex } from '@radix-ui/themes';

const GuideLoading: React.FC<{ type: string }> = ({ type }) => {
  return (
    <Flex direction="column" className="gap-2">
      <Box className="bg-black bg-opacity-40 w-full h-40 rounded-lg animate-pulse" />
      <Flex align="center" justify="center" className="w-full gap-4">
        {[...Array(type === 'Image' ? 4 : 2)].map((_, index) => (
          <Box
            key={index}
            className="w-8 h-8 rounded-sm bg-black bg-opacity-40 animate-pulse"
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default GuideLoading;
