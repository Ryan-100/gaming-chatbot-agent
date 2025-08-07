import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';

interface LanguageWrapperProps {
  language: string;
  icon: JSX.Element;
  element: JSX.Element;
}

const LanguageWrapper: React.FC<LanguageWrapperProps> = ({
  language,
  icon,
  element,
}) => {
  return (
    <Box className="border border-neutral-400 rounded-lg h-fit col-span-1">
      <Flex
        align="center"
        justify="center"
        className="w-full py-2 px-4 border-b border-neutral-400"
      >
        <Flex gapX="4px" align="center">
          {icon}
          <Text className="text-sm font-semibold">{language}</Text>
        </Flex>
      </Flex>
      {element}
    </Box>
  );
};

export default LanguageWrapper;
