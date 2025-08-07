import { Flex, Grid, Text } from '@radix-ui/themes';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../../../ui/context-menu';

interface IMenuCard {
  message: string;
  date?: string;
  isPinned?: boolean;
  messageId: string;
  pinHandler: (value: string) => void;
  unPinHandler: (value: string) => void;
}

const MessageBox = (data: IMenuCard) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Grid className="w-full gap-1">
          <Flex justify="start" className="w-full">
            <div className="relative z-0 flex flex-col items-start">
              <div className="flex items-start justify-between bg-surface-brandLight p-2 px-3 rounded-[8px] rounded-bl-none ">
                <Text className="max-w-[500px] text-sm text-wrap">
                  {data.message}
                </Text>
              </div>
              <Text className="text-[10px] text-text-secondary text-left pt-[1px]">
                {data.date}
              </Text>
            </div>
          </Flex>
        </Grid>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          inset
          onClick={() => {
            navigator.clipboard
              .writeText(data.message)
              .then(() => {
                console.log('Text copied to clipboard:', data.message);
              })
              .catch((error) => {
                console.error('Failed to copy text:', error);
              });
          }}
        >
          Copy Message
        </ContextMenuItem>

        <ContextMenuItem
          inset
          onClick={() => {
            if (data.isPinned) {
              data.unPinHandler(data.messageId);
            } else {
              data.pinHandler(data.messageId);
            }
          }}
        >
          {!data.isPinned ? 'Pin Message' : 'Unpin Message'}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MessageBox;
