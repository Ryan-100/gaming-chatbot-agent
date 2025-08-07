'use client';
import { Box, Flex } from '@radix-ui/themes';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import LineTabItem from '../../../shared/LineTabItem';
import { useEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import {
  ChatRoomListData,
  PlayerMediaData,
} from '../../../../types/chat.types';
import { getLastTime } from '../../../../utils/lastTime';
import { useSocket } from '../../../../stores/socket.slice';
import { dispatch, useAppSelector } from '../../../../stores';
import {
  changeMessageSize,
  removeUnReadRoom,
  selectRoomId,
  useLazyGetPlayerMediaQuery,
} from '../../../../stores/reducers/chat.reducer';

interface ChatListsProps {
  selectedChat: ChatRoomListData | null;
  setSelectedChat: (value: ChatRoomListData | null) => void;
  chatList: ChatRoomListData[];
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  setSelectedPlayerMedia: (value: PlayerMediaData) => void;
  setTop: (value: boolean) => void;
  setShowRoomDetail: (value: boolean) => void;
}

const tabLists = [
  { label: 'All Chats', value: 'all-chats' },
  { label: 'Unread Chats', value: 'un-chats' },
  { label: 'Blocked Chats', value: 'blocked-chats' },
];

const ChatLists: React.FC<ChatListsProps> = ({
  selectedChat,
  setSelectedChat,
  chatList,
  selectedTab,
  setSelectedTab,
  setSelectedPlayerMedia,
  setTop,
  setShowRoomDetail,
}) => {
  const { socket } = useSocket();
  const [keyword, setKeyword] = useState('');
  const [playerMediaAction] = useLazyGetPlayerMediaQuery();

  const newRoomList = useAppSelector((state) => state.chat.unReadRoom);

  const unReadRoomList =
    chatList.filter((item1) =>
      newRoomList.find((item2) => item2 === item1.id)
    ) ?? [];

  const blockedRoomList =
    chatList.filter((item1) => item1.ChatRoomStatus === 'BLOCKED') ?? [];

  const [tableData, setTableData] = useState(chatList);
  const [unReadTableData, setUnReadTableData] = useState(unReadRoomList);
  const [blockTableData, setBlockTableData] = useState(blockedRoomList);

  useEffect(() => {
    setTableData(chatList);
    setUnReadTableData(unReadRoomList);
    setBlockTableData(blockedRoomList);
  }, [chatList]);

  const filterHandler = () => {
    const searchTerm = keyword.toLowerCase();
    if (selectedTab === 'all-chats') {
      const filterData = chatList.filter((item) => {
        const matchesSearchTerm =
          item.Player.name.toLowerCase().includes(searchTerm) ||
          item.Player.id.toLowerCase().includes(searchTerm);

        return matchesSearchTerm;
      });
      setTableData(filterData);
    } else if (selectedTab === 'un-chats') {
      const filterData = unReadRoomList.filter((item) => {
        const matchesSearchTerm =
          item.Player.name.toLowerCase().includes(searchTerm) ||
          item.Player.id.toLowerCase().includes(searchTerm);

        return matchesSearchTerm;
      });
      setUnReadTableData(filterData);
    } else {
      const filterData = blockedRoomList.filter((item) => {
        const matchesSearchTerm =
          item.Player?.name?.toLowerCase().includes(searchTerm) ||
          item.Player?.id?.toLowerCase().includes(searchTerm);

        return matchesSearchTerm;
      });
      setBlockTableData(filterData);
    }
  };

  useEffect(() => {
    filterHandler();
  }, [keyword]);

  return (
    <Box>
      <Box className=" border-r border-border-secondary pt-4 space-y-4 pb-4">
        <Flex className="px-4">
          <Input
            placeholder="Search"
            className="rounded-full bg-white h-[32px]"
            postfix={<Icons.Search className="w-5 h-5 " />}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Flex>
        <Flex justify="between" className="px-4">
          {tabLists.map((item, index) => {
            return (
              <LineTabItem
                title={item.label}
                key={index}
                status={selectedTab === item.value ? 'active' : 'unActive'}
                onPress={() => {
                  setSelectedTab(item.value);
                  setSelectedChat(null);
                }}
              />
            );
          })}
        </Flex>
      </Box>
      <Box className="h-[60dvh] lg:h-[70dvh] overflow-auto pb-[20px] ">
        {selectedTab === 'all-chats' ? (
          <Box>
            {tableData.map((item, index) => (
              <ChatListItem
                active={selectedChat?.id === item.id}
                blocked={item?.ChatRoomStatus === 'BLOCKED'}
                image={item?.Player?.Image?.url ?? ''}
                lastMin={
                  item.Message.length > 0
                    ? getLastTime(item.Message[0]?.createdAt)
                    : ''
                }
                msg={item.Message[0]?.content ?? ' '}
                username={item.Player?.name ?? ''}
                onPress={async () => {
                  setShowRoomDetail(true);
                  setTop(false);
                  setSelectedChat(item);
                  if (socket) {
                    socket.emit('get-messages', {
                      roomId: item?.id ?? '',
                      page: 1,
                      size: 50,
                    });
                    socket.emit('get-pinned-messages', {
                      roomId: item?.id ?? '',
                    });
                  }
                  dispatch(changeMessageSize(50));
                  dispatch(selectRoomId(item?.id ?? ''));
                  dispatch(removeUnReadRoom(item?.id));
                  const data = await playerMediaAction({ id: item.Player?.id });
                  setSelectedPlayerMedia(
                    data.data?.body?.data ?? {
                      media: [{ name: '', url: '', date: new Date() }],
                      file: [{ name: '', url: '', date: new Date() }],
                    }
                  );
                }}
                key={index}
                new={newRoomList.includes(item.id)}
              />
            ))}
          </Box>
        ) : selectedTab === 'un-chats' ? (
          <Box>
            {unReadTableData.map((item, index) => (
              <ChatListItem
                active={selectedChat?.id === item.id}
                blocked={item?.ChatRoomStatus === 'BLOCKED'}
                image={item?.Player?.Image?.url ?? ''}
                lastMin={
                  item.Message.length > 0
                    ? getLastTime(item.Message[0]?.createdAt)
                    : ''
                }
                msg={item.Message[0]?.content ?? ' '}
                username={item.Player.name}
                onPress={async () => {
                  setTop(false);
                  setShowRoomDetail(true);
                  setSelectedChat(item);
                  if (socket) {
                    socket.emit('get-messages', {
                      roomId: item?.id ?? '',
                      page: 1,
                      size: 50,
                    });
                    socket.emit('get-pinned-messages', {
                      roomId: item?.id ?? '',
                    });
                  }
                  dispatch(changeMessageSize(50));
                  dispatch(selectRoomId(item?.id ?? ''));
                  dispatch(removeUnReadRoom(item?.id));
                  const data = await playerMediaAction({ id: item.Player?.id });
                  setSelectedPlayerMedia(
                    data.data?.body?.data ?? {
                      media: [{ name: '', url: '', date: new Date() }],
                      file: [{ name: '', url: '', date: new Date() }],
                    }
                  );
                }}
                key={index}
                new={newRoomList.includes(item.id)}
              />
            ))}
          </Box>
        ) : selectedTab === 'blocked-chats' ? (
          <Box>
            {blockTableData.map((item, index) => (
              <ChatListItem
                active={selectedChat?.id === item.id}
                blocked={item?.ChatRoomStatus === 'BLOCKED'}
                image={item?.Player?.Image?.url ?? ''}
                lastMin={
                  item.Message.length > 0
                    ? getLastTime(item.Message[0]?.createdAt)
                    : ''
                }
                msg={item.Message[0]?.content ?? ' '}
                username={item.Player.name}
                onPress={async () => {
                  setTop(false);
                  setShowRoomDetail(true);
                  setSelectedChat(item);
                  if (socket) {
                    socket.emit('get-messages', {
                      roomId: item?.id ?? '',
                      page: 1,
                      size: 50,
                    });
                    socket.emit('get-pinned-messages', {
                      roomId: item?.id ?? '',
                    });
                  }
                  dispatch(changeMessageSize(50));
                  dispatch(selectRoomId(item?.id ?? ''));
                  dispatch(removeUnReadRoom(item?.id));
                  const data = await playerMediaAction({ id: item.Player?.id });
                  setSelectedPlayerMedia(
                    data.data?.body?.data ?? {
                      media: [{ name: '', url: '', date: new Date() }],
                      file: [{ name: '', url: '', date: new Date() }],
                    }
                  );
                }}
                key={index}
                new={newRoomList.includes(item.id)}
              />
            ))}
          </Box>
        ) : (
          <div></div>
        )}
      </Box>
    </Box>
  );
};

export default ChatLists;
