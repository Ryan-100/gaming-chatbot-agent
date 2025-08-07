import { Box, Flex } from '@radix-ui/themes';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { cn } from '../../../../utils/cn';

const ChatListItem = (props: {
  blocked: boolean;
  active: boolean;
  image: string;
  username: string;
  msg: string;
  lastMin: string;
  onPress?: () => void;
  new: boolean;
}) => {
  return (
    <Box
      className={cn(
        props.active ? 'bg-surface-secondary' : '',
        'pl-4 pr-6 w-full py-3 cursor-pointer '
      )}
      onClick={props.onPress}
    >
      <Flex align="center" className="space-x-2  w-full">
        <Avatar className="w-[32px] h-[32px]">
          <AvatarImage src={props.image} alt="profile avatar" />
          <AvatarFallback> {props?.username?.charAt(0) ?? ''}</AvatarFallback>
        </Avatar>
        <Flex className="w-full" justify="between">
          <Box className="w-full">
            <Flex className="max-w-full">
              <p className="text-[14px] font-semibold truncate w-[150px]">
                {props.username}
              </p>
              {props.blocked && (
                <Flex
                  className="bg-surface-brandLight text-text-error rounded-[10px] text-[10px] font-semibold px-2 py-1"
                  align="center"
                >
                  Blocked
                </Flex>
              )}
            </Flex>
            <p className="text-[14px] text-text-secondary truncate w-[200px]">
              {props.msg ?? ' '}
            </p>
          </Box>
          <Flex
            direction="column"
            align="center"
            justify="between"
            className="pb-[6px] w-[80px]"
          >
            <p className="text-[10px] text-text-secondary pt-1 pr-4">
              {props.lastMin}
            </p>
            {props.new && (
              <Box className="bg-border-brand w-[8px] h-[8px] rounded-full" />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatListItem;
