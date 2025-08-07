'use client';
import React from 'react';

import { Box, Flex } from '@radix-ui/themes';

interface InputBoxPropsType {
  children: React.ReactNode;
  hideChat?: boolean;
}

const InputLayout = (props: InputBoxPropsType) => {
  return (
    <Box className="absolute bottom-0 right-0 left-0 flex flex-col align-center z-20 bg-slag-500 shadow mx-2">
      <Flex
        className="w-full bg-white px-4 py-2 gap-x-4"
        justify={'between'}
        align={'center'}
      >
        {props.children}
      </Flex>
    </Box>
  );
};

export default InputLayout;
