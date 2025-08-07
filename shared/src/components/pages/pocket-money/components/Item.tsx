import { Flex, Text, Box } from '@radix-ui/themes';

interface ItemPropsType {
  label: string;
  value: string | number | boolean | JSX.Element;
}

export const Item = (props: ItemPropsType) => {
  return (
    <Flex
      align={'center'}
      className="border-b-[1px] border-b-neutral-400 py-3 text-xs last:border-none"
    >
      <Flex justify={'start'} className="w-1/2 items-center">
        <Text className="text-center text-sm"> {props.label} </Text>
      </Flex>
      <Flex justify={'start'} className="items-start">
        <Box className="text-center"> {props.value} </Box>
      </Flex>
    </Flex>
  );
};
