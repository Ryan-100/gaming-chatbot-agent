import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { Image } from '../../../ui/image';
import { cn } from '../../../../utils/cn';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../../../ui/context-menu';

const MessageCard = (props: {
  message: string;
  date?: string;
  isFile?: boolean;
  isPinned?: boolean;
  messageId: string;
  pinHandler: (value: string) => void;
  unPinHandler: (value: string) => void;
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Grid className="w-full gap-1">
          <Flex justify="end" className="w-full">
            <div className="relative flex flex-col items-end">
              <div
                className={cn(
                  'flex items-start justify-between bg-surface-brand text-white p-2 px-3 rounded-[8px] rounded-br-none gap-2'
                )}
              >
                {props.isFile && (
                  <Box className="mb-[-2px] bg-white">
                    <Image
                      src={'/upload/icons/file-icon.svg'}
                      alt="file-icon"
                      width={48}
                      height={48}
                    />
                  </Box>
                )}
                <Text className="max-w-[500px] text-sm text-wrap">
                  {props.message}
                </Text>
              </div>
              <Text className="text-[10px] pt-[1px] text-text-secondary text-right">
                {props.date}
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
              .writeText(props.message)
              .then(() => {
                console.log('Text copied to clipboard:', props.message);
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
            if (props.isPinned) {
              props.unPinHandler(props.messageId);
            } else {
              props.pinHandler(props.messageId);
            }
          }}
        >
          {!props.isPinned ? 'Pin Message' : 'Unpin Message'}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MessageCard;
