'use client';
import { Box, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import ChatLists from './sections/ChatLists';
import UserInformation from './sections/UserInformation';
import ChatRoom from './sections/ChatRoom';
import {
  addUnReadRoom,
  useGetChatRoomListQuery,
} from '../../../stores/reducers/chat.reducer';
import { ChatRoomListData, PlayerMediaData } from '../../../types/chat.types';
import { dispatch } from '../../../stores';
import { cn } from '../../../utils/cn';

const ChattingRoom = () => {
  const [selectedChat, setSelectedChat] = useState<ChatRoomListData | null>(
    null
  );
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showRoomDetail, setShowRoomDetail] = useState(false);
  const [top, setTop] = useState(false);
  const { data: chatRoomData } = useGetChatRoomListQuery();
  const [selectedTab, setSelectedTab] = useState('all-chats');
  const [selectedPlayerMedia, setSelectedPlayerMedia] =
    useState<PlayerMediaData>({
      media: [{ name: '', url: '', date: new Date() }],
      file: [{ name: '', url: '', date: new Date() }],
    });

  const chatRoomList = chatRoomData?.body?.data.filter(
    (item) => item.Message.length > 0
  );

  useEffect(() => {
    if (chatRoomData?.body?.data && chatRoomData.body.data.length > 0) {
      chatRoomData.body.data.forEach((item) => {
        if (item.Message[0]?.sender === 'PLAYER') {
          dispatch(addUnReadRoom(item.id));
        }
      });
    }
    if (selectedChat) {
      const selected = chatRoomData?.body?.data?.find(
        (item) => item.id === selectedChat.id
      );
      if (selected) setSelectedChat(selected);
    }
  }, [chatRoomData]);

  return (
    <Flex className="relative h-full border-t border-border-secondary pb-5 hidden-scrollbar">
      <Box
        display={{ initial: showRoomDetail ? 'none' : 'block', md: 'block' }}
        className={cn('w-full md:max-w-[300px] md:min-w-[300px] h-full ')}
      >
        <ChatLists
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          chatList={chatRoomList ?? []}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setSelectedPlayerMedia={setSelectedPlayerMedia}
          setTop={setTop}
          setShowRoomDetail={setShowRoomDetail}
        />
      </Box>

      {showRoomDetail && (
        <Box
          className="w-full h-full bg-white "
          display={{ initial: showUserInfo ? 'none' : 'block', md: 'block' }}
        >
          {selectedChat && (
            <ChatRoom
              selectedChat={selectedChat}
              showUserInfo={showUserInfo}
              setShowUserInfo={setShowUserInfo}
              setShowRoomDetail={setShowRoomDetail}
              top={top}
              setTop={setTop}
              setSelectedPlayerMedia={setSelectedPlayerMedia}
            />
          )}
        </Box>
      )}

      {selectedChat && showUserInfo && selectedPlayerMedia && (
        <Box className="w-full md:max-w-[300px] h-full bg-white">
          <UserInformation
            setShowUserInfo={setShowUserInfo}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            setSelectedTab={setSelectedTab}
            selectedPlayerMedia={selectedPlayerMedia}
            setShowRoomDetail={setShowRoomDetail}
          />
        </Box>
      )}
    </Flex>
  );
};
export default ChattingRoom;
