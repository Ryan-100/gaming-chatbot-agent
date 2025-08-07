import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Icons } from '../../../../ui/icons';

type ColorCycleProps = {
  color: string;
  isSelected: boolean;
  setColorCode:()=>void;
};
const ColorCycle: React.FC<ColorCycleProps> = ({ color, isSelected, setColorCode }) => {
  return (
    <Flex direction={'column'} className="relative gap-1 cursor-pointer" onClick={setColorCode}>
      {isSelected && (
        <Flex
          align={'center'}
          justify={'center'}
          width={'56px'}
          height={'56px'}
          className="absolute rounded-full"
        >
          <Icons.Good className="text-white w-5 h-5 rounded-full shadow" />
        </Flex>
      )}
      <Box
        width={'56px'}
        height={'56px'}
        className="rounded-full"
        style={{
          backgroundColor: color,
        }}
      />
      <Text className="text-sm">{color}</Text>
    </Flex>
  );
};

export default ColorCycle;
