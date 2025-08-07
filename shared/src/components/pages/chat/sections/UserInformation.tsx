'use client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { Icons } from '../../../ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { maskChar, maskEmail } from '../../../../utils/maskChar';
import { Button } from '../../../ui/button';
import {
  ChatRoomListData,
  PlayerMediaData,
} from '../../../../types/chat.types';
import {
  useBlockChatPlayerMutation,
  useUnBlockChatPlayerMutation,
} from '../../../../stores/reducers/chat.reducer';
import { toast } from 'sonner';
import Loading from '../../../ui/loading';
import { Image } from '../../../ui/image';
import dayjs from '../../../../utils/dayjs';
import { useState } from 'react';
import MediaDialog from '../components/MediaDialog';

interface UserInformationProps {
  setShowUserInfo: (value: boolean) => void;
  selectedChat: ChatRoomListData | null;
  setSelectedChat: (value: ChatRoomListData | null) => void;
  setSelectedTab: (value: string) => void;
  selectedPlayerMedia: PlayerMediaData;
  setShowRoomDetail: (value: boolean) => void;
}

const UserInformation: React.FC<UserInformationProps> = ({
  setShowUserInfo,
  selectedChat,
  setSelectedChat,
  setSelectedTab,
  selectedPlayerMedia,
  setShowRoomDetail,
}) => {
  const [blockAction, { isLoading: blockLoading }] =
    useBlockChatPlayerMutation();
  const [unBlockAction, { isLoading: unBlockLoading }] =
    useUnBlockChatPlayerMutation();

  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const initialLimit = 9;

  const handlerBlockAction = async () => {
    if (selectedChat) {
      try {
        const response = await blockAction({
          playerId: selectedChat?.Player.id,
          reason: '',
        });
        if (response.data?.meta?.success) {
          toast.success(response?.data?.meta?.message);
          setSelectedTab('blocked-chats');
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlerUnBlockAction = async () => {
    if (selectedChat) {
      try {
        const response = await unBlockAction({
          playerId: selectedChat?.Player.id,
          reason: '',
        });
        if (response.data?.meta?.success) {
          toast.success(response?.data?.meta?.message);
          setSelectedTab('all-chats');
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDownload = (url: string, name: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', name); // Force download
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link); // Clean up
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Box className="px-4">
      {blockLoading || unBlockLoading ? (
        <Loading />
      ) : (
        <Box className="py-5 space-y-3 border-b border-b-border-secondary">
          <Flex align="center" justify="between">
            <p className="text-[18px]">User Information</p>
            <Icons.Close
              className="w-5 h-5"
              onClick={() => setShowUserInfo(false)}
            />
          </Flex>
          <Box className="overflow-y-auto h-[60dvh] lg:h-[75dvh] space-y-2">
            <Flex direction="column" align="center" className="space-y-6">
              <Flex direction="column" align="center">
                <Avatar className="w-[120px] h-[120px]">
                  <AvatarImage
                    src={selectedChat?.Player?.Image?.url}
                    alt="profile avatar"
                  />
                  <AvatarFallback>
                    {selectedChat?.Player?.name?.charAt(0) ?? ''}
                  </AvatarFallback>
                </Avatar>

                <p className="font-semibold text-[20px] truncate max-w-[200px]">
                  {selectedChat?.Player.name}
                </p>
                <p className="font-medium text-[14px]">
                  {selectedChat?.Player?.email
                    ? maskEmail(selectedChat?.Player?.email ?? '')
                    : maskChar(selectedChat?.Player?.phone ?? '')}
                </p>
              </Flex>
              <Button
                variant={
                  selectedChat?.ChatRoomStatus === 'ASSIGNED'
                    ? 'outline'
                    : 'default'
                }
                className={
                  selectedChat?.ChatRoomStatus === 'ASSIGNED'
                    ? 'text-text-error border-text-error'
                    : ''
                }
                onClick={() => {
                  if (selectedChat?.ChatRoomStatus === 'ASSIGNED') {
                    handlerBlockAction();
                  } else {
                    handlerUnBlockAction();
                  }
                }}
              >
                {selectedChat?.ChatRoomStatus === 'ASSIGNED'
                  ? 'Block Player'
                  : 'UnBlock Player'}
              </Button>
            </Flex>
            <Box className="py-2">
              <Flex align="center" justify="between">
                <Flex align="center" className="text-[14px]">
                  <div>{`Photos (${selectedPlayerMedia?.media.length})`}</div>
                </Flex>
                <div
                  className="text-primary font-medium cursor-pointer text-[12px]"
                  onClick={() => setShowAllMedia(!showAllMedia)}
                >
                  {showAllMedia ? 'Show Less' : 'View All'}
                </div>
              </Flex>
              <Grid columns="3" className="gap-2">
                {(showAllMedia
                  ? selectedPlayerMedia.media
                  : selectedPlayerMedia.media.slice(0, initialLimit)
                ).map((item, index) => {
                  console.log(selectedPlayerMedia.media);

                  return (
                    <div key={index}>
                      <MediaDialog
                        mediaList={selectedPlayerMedia.media}
                        url={item.url}
                        type={
                          item.name.match(/\.(mp4|mov)$/i) ? 'video' : 'image'
                        }
                        index={index}
                      />
                    </div>
                  );
                })}
              </Grid>
            </Box>
            <Box className="py-2">
              <Flex align="center" justify="between">
                <Flex align="center">
                  <div className="text-[14px]">{`Files (${selectedPlayerMedia?.file.length})`}</div>
                </Flex>
                <div
                  className="text-primary font-medium cursor-pointer text-[12px]"
                  onClick={() => setShowAllFiles(!showAllFiles)}
                >
                  {showAllFiles ? 'Show Less' : 'View All'}
                </div>
              </Flex>
              <Grid columns="1" className="gap-2">
                {(showAllFiles
                  ? selectedPlayerMedia.file
                  : selectedPlayerMedia.file.slice(0, 6)
                ).map((item, index) => (
                  <a
                    key={index}
                    onClick={() => handleDownload(item.url, item.name)}
                  >
                    <Flex
                      direction={'row'}
                      justify={'between'}
                      align={'center'}
                      gap={'4'}
                      className="p-4 rounded-[8px] h-16"
                    >
                      <Flex
                        justify="center"
                        align="center"
                        className="w-[42px] h-[42px] bg-surface-secondary rounded-md"
                      >
                        <Image
                          src={'/upload/icons/file-icon.svg'}
                          width={18}
                          height={18}
                          alt="Folder Icon"
                          className=""
                        />
                      </Flex>

                      <Flex
                        direction={'column'}
                        className="justify-center items-start flex-1 max-w-[80%] box-border "
                      >
                        <p className="text-[14px] 2xs:text-[16px] font-normal max-w-full truncate one-line-text pb-1">
                          {item.name ?? '-'}
                        </p>

                        <div className="text-neutral-500 text-[12px] text-right">
                          {dayjs(item.date).format('MMM DD, YYYY, hh:mm A')}{' '}
                        </div>
                      </Flex>
                    </Flex>
                  </a>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserInformation;
