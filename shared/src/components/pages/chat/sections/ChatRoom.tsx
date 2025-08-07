'use client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Icons } from '../../../ui/icons';
import InputLayout from '../../../shared/InputLayout';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Image } from '../../../ui/image';
import { Button } from '../../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import SendBtn from '../../../shared/SendBtn';
import { useAppSelector } from '../../../../stores';
import {
  useSendMessageMutation,
  usePinMessageMutation,
  useUnpinMessageMutation,
  useLazyGetPlayerMediaQuery,
} from '../../../../stores/reducers/chat.reducer';
import MessageCard from '../components/MessageCard';
import MessageBox from '../components/MessageBox';
import { useSocket } from '../../../../stores/socket.slice';
import {
  ChatRoomListData,
  PlayerMediaData,
} from '../../../../types/chat.types';
import { getAttachmentType, getFileType } from '../../../../utils/getFileType';
import dayjs from '../../../../utils/dayjs';
import ImageSend from '../components/ImageSend';
import VideoSend from '../components/VideoSend';
import ImageReply from '../components/ImageReply';
import VideoReply from '../components/VideoReply';
import DownloadFileReply from '../components/DownloadFileReply';
import { toast } from 'sonner';
import ImageEditDialog from '../components/ImageEditDialog';
import DownloadFileSend from '../components/DownloadFileSend';
import Loading from '../../../ui/loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import AudioSend from '../components/AudioSend';
import AudioReply from '../components/AudioReply';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../../../ui/context-menu';
import { ChevronLeft, ImageIcon, Pin, Video, X } from 'lucide-react';

interface ChatListsProps {
  selectedChat: ChatRoomListData | null;
  showUserInfo: boolean;
  setShowUserInfo: (value: boolean) => void;
  setShowRoomDetail: (value: boolean) => void;
  top: boolean;
  setTop: (value: boolean) => void;
  setSelectedPlayerMedia: (value: PlayerMediaData) => void;
}

const ChatRoom: React.FC<ChatListsProps> = ({
  selectedChat,
  showUserInfo,
  setShowUserInfo,
  setShowRoomDetail,
  top,
  setTop,
  setSelectedPlayerMedia,
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const chat = useAppSelector((state) => state.chat.value);
  const pinnedChat = useAppSelector((state) => state.chat.pinnedChat);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [sendAction] = useSendMessageMutation();
  const { socket } = useSocket();
  const messageSize = useAppSelector((state) => state.chat.messageSize);
  const [imagesEditDialog, setImagesEditDialog] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [playerMediaAction] = useLazyGetPlayerMediaQuery();

  const [fetchSize, setFetchSize] = useState(50);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [pinnedIndex, setPinnedIndex] = useState(pinnedChat.length - 1);
  const [pinnedShow, setPinnedShow] = useState(false);
  const [disableSend, setDisableSend] = useState(false);

  const sendHandler = async () => {
    setTop(false);
    setDisableSend(true);
    const textData = input;
    setInput('');
    if (!textData.trim()) return;
    const updatedData = {
      chatRoomId: selectedChat?.id ?? '',
      content: textData,
      isPinned: false,
    };
    if (socket) {
      try {
        const response = await sendAction(updatedData);
        if (response.data?.meta?.success) {
          setDisableSend(false);
          socket.emit('get-messages', {
            roomId: selectedChat?.id ?? '',
            page: 1,
            size: messageSize,
          });
          const data = await playerMediaAction({
            id: selectedChat?.Player?.id ?? '',
          });
          setSelectedPlayerMedia(
            data.data?.body?.data ?? {
              media: [{ name: '', url: '', date: new Date() }],
              file: [{ name: '', url: '', date: new Date() }],
            }
          );
        } else {
          setDisableSend(false);
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
        setDisableSend(false);
      }

      setDisableSend(false);
    }
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setTop(false);
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      if (file) {
        console.log('files', file);

        const updatedData = {
          chatRoomId: selectedChat?.id ?? '',
          caption: files[0].name.toString(),
          content: getFileType(files[0]?.name),
          attachmentType: getAttachmentType(getFileType(files[0]?.name)),
          attachments: [files[0]],
          isPinned: false,
        };
        if (socket) {
          try {
            const response = await sendAction(updatedData);
            if (response.data?.meta?.success) {
              socket.emit('get-messages', {
                roomId: selectedChat?.id ?? '',
                page: 1,
                size: messageSize,
              });
              const data = await playerMediaAction({
                id: selectedChat?.Player?.id ?? '',
              });
              setSelectedPlayerMedia(
                data.data?.body?.data ?? {
                  media: [{ name: '', url: '', date: new Date() }],
                  file: [{ name: '', url: '', date: new Date() }],
                }
              );
            } else {
              const errorResponse: any = response;
              toast.error(errorResponse?.error.data?.meta?.message);
            }
          } catch (error) {
            console.error(error);
          }
          setInput('');
          setImages([]);
        }
      }
    }
    e.target.value = '';
  };

  const handleChooseImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      setImages((prevImages) => {
        const newFiles = Array.from(files).slice(0, 5 - prevImages.length);
        const allFiles = [...prevImages, ...newFiles];
        if (allFiles.length > 5) {
          toast.error('You can only upload up to 5 files.');
          return prevImages;
        }
        return allFiles;
      });
    }
    setImagesEditDialog(true);
    e.target.value = '';
  };

  useEffect(() => {
    if (socket) {
      socket.emit('join-room', selectedChat?.id ?? '');
      socket.emit('get-messages', {
        roomId: selectedChat?.id ?? '',
        page: 1,
        size: fetchSize,
      });
      socket.emit('get-pinned-messages', {
        roomId: selectedChat?.id ?? '',
      });
    }
  }, [selectedChat, fetchSize]);

  useEffect(() => {
    setPinnedIndex(pinnedChat?.length - 1);
  }, [pinnedChat]);

  const handlePinnedChatChange = () => {
    setPinnedShow(true);
    setTop(false);
    if (socket)
      socket.emit('get-pinned-messages', {
        roomId: selectedChat?.id ?? '',
      });
  };

  useEffect(() => {
    if (messageRef.current) {
      const newScrollHeight = messageRef.current.scrollHeight;
      if (!top) {
        messageRef.current.scrollTop = newScrollHeight;
        setPrevScrollHeight(newScrollHeight);
      } else {
        messageRef.current.scrollTop = newScrollHeight - prevScrollHeight;
        setPrevScrollHeight(newScrollHeight);
      }
    }
  }, [chat, top]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chat]);

  const fetchMoreMessages = () => {
    if (messageSize > 0 && messageSize >= fetchSize) {
      setTop(true);
      setFetchSize((prevSize) => prevSize + 50);
    } else if (messageSize < fetchSize) {
      console.log('Stopping fetch, not enough messages');
    }
  };

  const handleScroll = () => {
    if (messageRef.current) {
      const { scrollTop } = messageRef.current;
      if (scrollTop === 0) {
        fetchMoreMessages();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendHandler();
    }
    if (socket) socket.emit('trying-on', selectedChat?.id);
  };

  const groupedByDate = pinnedShow
    ? pinnedChat.reduce((acc, chat) => {
        const chatDate = dayjs(chat.date).format('YYYY-MM-DD'); // Extract the date part only
        if (!acc[chatDate]) {
          acc[chatDate] = [];
        }
        acc[chatDate].push(chat);
        return acc;
      }, {} as Record<string, any[]>)
    : chat.reduce((acc, chat) => {
        const chatDate = dayjs(chat.date).format('YYYY-MM-DD'); // Extract the date part only
        if (!acc[chatDate]) {
          acc[chatDate] = [];
        }
        acc[chatDate].push(chat);
        return acc;
      }, {} as Record<string, any[]>);

  const [pinAction] = usePinMessageMutation();
  const [unPinAction] = useUnpinMessageMutation();

  const PinHandler = async (messageId: string) => {
    try {
      const response = await pinAction({ messageId: messageId });
      if (response.data?.meta?.success) {
        if (socket) {
          socket.emit('get-messages', {
            roomId: selectedChat?.id ?? '',
            page: 1,
            size: fetchSize,
          });
          socket.emit('get-pinned-messages', {
            roomId: selectedChat?.id ?? '',
          });
        }
        setTop(false);
      } else {
        console.error('Error sending file:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UnPinHandler = async (messageId: string) => {
    try {
      const response = await unPinAction({ messageId: messageId });
      if (response.data?.meta?.success) {
        if (socket) {
          socket.emit('get-messages', {
            roomId: selectedChat?.id ?? '',
            page: 1,
            size: fetchSize,
          });
          socket.emit('get-pinned-messages', {
            roomId: selectedChat?.id ?? '',
          });
        }
        setTop(false);
      } else {
        console.error('Error sending file:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="relative h-full">
      <Box className="h-full">
        {pinnedShow ? (
          <Flex className="bg-white p-4 gap-2 font-semibold max-w-[250px] absolute top-0 z-30">
            <X
              onClick={() => {
                setPinnedShow(!pinnedShow);
                setTop(false);
              }}
              className="cursor-pointer "
            />
            Pinned Message ({selectedChat?.Player?.name})
          </Flex>
        ) : (
          <Flex
            align="center"
            className="space-x-2 w-full py-2 pl-2 pr-4 border-b border-border-secondary absolute top-0 z-30 bg-white"
          >
            <Box display={{ initial: 'block', md: 'none' }}>
              <ChevronLeft
                onClick={() => {
                  setShowRoomDetail(false);
                }}
                className="cursor-pointer w-6 h-6"
              />
            </Box>
            <Avatar className="w-[56px] h-[56px]">
              <AvatarImage
                src={selectedChat?.Player?.Image?.url}
                alt="profile avatar"
              />
              <AvatarFallback>
                {selectedChat?.Player?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Flex className="w-full" justify="between">
              <Flex className="max-w-[70dvw]">
                <Box>
                  <Flex>
                    <p className="text-[14px] font-semibold pr-1 truncate max-w-[30dvw]">
                      {selectedChat?.Player?.name ?? ''}
                    </p>
                  </Flex>
                  <p className="text-[14px] text-text-secondary">
                    {selectedChat?.Player?.status}
                  </p>
                </Box>
                {selectedChat?.ChatRoomStatus === 'BLOCKED' && (
                  <Box>
                    <Flex
                      className="bg-surface-brandLight text-text-error rounded-[10px] text-[10px] font-semibold px-2 py-1"
                      align="center"
                    >
                      Blocked
                    </Flex>
                  </Box>
                )}
              </Flex>

              <Flex align="center" justify="between" className="space-x-3">
                {!showUserInfo && (
                  <Icons.Menu
                    className="w-6 h-6"
                    onClick={() => setShowUserInfo(!showUserInfo)}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
        )}
        {!pinnedShow && pinnedChat.length > 0 && (
          <Flex
            justify="between"
            className="absolute top-[73px] bg-surface-primary w-full h-[60px] z-50 shadow-md px-6 overflow-hidden cursor-pointer"
          >
            <Flex
              direction={'column'}
              justify={'center'}
              onClick={handlePinnedChatChange}
            >
              <Flex className="text-text-brand gap-x-1">
                <div className="font-bold text-[14px]">
                  {pinnedChat.length} {'Pinned Message(s)'}
                </div>
              </Flex>
              <Flex className="flex-col text-bold text-[12px] truncate pt-1 w-[300px]">
                <span className="pr-1 truncate">
                  {pinnedChat[pinnedIndex]?.caption}
                </span>
                {pinnedChat[pinnedIndex]?.chat}
              </Flex>
            </Flex>

            <Flex
              justify="center"
              align="center"
              onClick={() => {
                setPinnedShow(true);
                if (socket)
                  socket.emit('get-pinned-messages', {
                    roomId: selectedChat?.id ?? '',
                  });
              }}
              className="cursor-pointer"
            >
              <Pin className="" />
            </Flex>
          </Flex>
        )}
        <Grid
          ref={messageRef}
          onScroll={handleScroll}
          className="px-6 py-10 overflow-auto max-h-full"
          align="start"
          justify="start"
          gap="1"
        >
          <InfiniteScroll
            dataLength={chat.length ?? 0}
            next={fetchMoreMessages}
            hasMore={messageSize < fetchSize + 50}
            loader={
              top && (
                <div className="absolute h-[50px] w-full">
                  <Loading color="primary" />
                </div>
              )
            }
            className="flex flex-col overflow-hidden"
          >
            {Object.keys(groupedByDate).map((date) => (
              <Grid key={date} gap="2">
                <Flex align="center" justify="center" className="pb-2">
                  <Box className="text-sm py-1 px-2 rounded-full">
                    {dayjs(date).format('DD MMM YYYY')}
                  </Box>
                </Flex>
                {groupedByDate[date].map((item, key) => {
                  if (item.type === 'sender') {
                    if (item.status === 'image') {
                      return (
                        <ContextMenu>
                          <Flex justify="end">
                            <ContextMenuTrigger>
                              <ImageSend
                                key={key}
                                url={item.attachment}
                                caption={item.caption}
                              />
                            </ContextMenuTrigger>
                          </Flex>
                          <ContextMenuContent className="w-64">
                            <ContextMenuItem
                              inset
                              onClick={() => {
                                if (item.isPinned) {
                                  UnPinHandler(item.messageId);
                                } else {
                                  PinHandler(item.messageId);
                                }
                              }}
                            >
                              {!item.isPinned ? 'Pin Message' : 'Unpin Message'}
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      );
                    } else if (item.status === 'document') {
                      return (
                        <div id={item.messageId}>
                          <ContextMenu>
                            <Flex justify="end">
                              <ContextMenuTrigger className="w-[250px]">
                                <DownloadFileSend
                                  key={key}
                                  time={dayjs(item.date).format('h:mm A')}
                                  message={`${item.caption}`}
                                  url={item.attachment}
                                />
                              </ContextMenuTrigger>
                            </Flex>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem
                                inset
                                onClick={() => {
                                  if (item.isPinned) {
                                    UnPinHandler(item.messageId);
                                  } else {
                                    PinHandler(item.messageId);
                                  }
                                }}
                              >
                                {!item.isPinned
                                  ? 'Pin Message'
                                  : 'Unpin Message'}
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        </div>
                      );
                    } else if (item.status === 'video') {
                      const video = {
                        url: item.attachment ?? '',
                        name: item.caption,
                      };
                      return (
                        <div id={item.messageId}>
                          <ContextMenu>
                            <Flex justify="end">
                              <ContextMenuTrigger>
                                <VideoSend
                                  key={key}
                                  video={video.url}
                                  time={dayjs(item.date).format('h:mm a')}
                                  caption={video.name}
                                />
                              </ContextMenuTrigger>
                            </Flex>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem
                                inset
                                onClick={() => {
                                  if (item.isPinned) {
                                    UnPinHandler(item.messageId);
                                  } else {
                                    PinHandler(item.messageId);
                                  }
                                }}
                              >
                                {!item.isPinned
                                  ? 'Pin Message'
                                  : 'Unpin Message'}
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        </div>
                      );
                    } else if (item.status === 'audio') {
                      return (
                        <div id={item.messageId}>
                          <ContextMenu>
                            <Flex justify="end">
                              <ContextMenuTrigger>
                                <AudioSend
                                  audioSrc={item.attachment}
                                  time={dayjs(item.date).format('h:mm a')}
                                />
                              </ContextMenuTrigger>
                            </Flex>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem
                                inset
                                onClick={() => {
                                  if (item.isPinned) {
                                    UnPinHandler(item.messageId);
                                  } else {
                                    PinHandler(item.messageId);
                                  }
                                }}
                              >
                                {!item.isPinned
                                  ? 'Pin Message'
                                  : 'Unpin Message'}
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        </div>
                      );
                    } else {
                      return (
                        <div id={item.messageId}>
                          <MessageCard
                            key={key}
                            date={dayjs(item.date).format('h:mm a')}
                            message={item.chat ?? ''}
                            isPinned={item?.isPinned}
                            messageId={item?.messageId}
                            pinHandler={PinHandler}
                            unPinHandler={UnPinHandler}
                          />
                        </div>
                      );
                    }
                  } else {
                    if (item.status === 'image') {
                      return (
                        <div id={item.messageId}>
                          <ContextMenu>
                            <Flex justify="start">
                              <ContextMenuTrigger>
                                <ImageReply
                                  key={key}
                                  url={item.attachment[0] ?? ''}
                                />
                              </ContextMenuTrigger>
                            </Flex>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem
                                inset
                                onClick={() => {
                                  if (item.isPinned) {
                                    UnPinHandler(item.messageId);
                                  } else {
                                    PinHandler(item.messageId);
                                  }
                                }}
                              >
                                {!item.isPinned
                                  ? 'Pin Message'
                                  : 'Unpin Message'}
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        </div>
                      );
                    } else if (item.status === 'document') {
                      return (
                        <div id={item.messageId}>
                          <ContextMenu>
                            <Flex justify="start">
                              <ContextMenuTrigger>
                                <DownloadFileReply
                                  key={key}
                                  time={dayjs(item.date).format('h:mm A')}
                                  message={`${item.caption}`}
                                  url={item.attachment}
                                />
                              </ContextMenuTrigger>
                            </Flex>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem
                                inset
                                onClick={() => {
                                  if (item.isPinned) {
                                    UnPinHandler(item.messageId);
                                  } else {
                                    PinHandler(item.messageId);
                                  }
                                }}
                              >
                                {!item.isPinned
                                  ? 'Pin Message'
                                  : 'Unpin Message'}
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        </div>
                      );
                    } else if (item.status === 'video') {
                      const video = {
                        url: item.attachment ?? '',
                        name: item.caption,
                      };
                      return (
                        <div id={item.messageId}>
                          <ContextMenu>
                            <Flex justify="start">
                              <ContextMenuTrigger>
                                <VideoReply
                                  key={key}
                                  video={video.url}
                                  time={dayjs(item.date).format('h:mm a')}
                                  caption={video.name}
                                />
                              </ContextMenuTrigger>
                            </Flex>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem
                                inset
                                onClick={() => {
                                  if (item.isPinned) {
                                    UnPinHandler(item.messageId);
                                  } else {
                                    PinHandler(item.messageId);
                                  }
                                }}
                              >
                                {!item.isPinned
                                  ? 'Pin Message'
                                  : 'Unpin Message'}
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        </div>
                      );
                    } else if (item.status === 'audio') {
                      return (
                        <div id={item.messageId}>
                          <ContextMenu>
                            <Flex justify="start">
                              <ContextMenuTrigger>
                                <AudioReply
                                  audioSrc={item.attachment}
                                  time={dayjs(item.date).format('h:mm a')}
                                />
                              </ContextMenuTrigger>
                            </Flex>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem
                                inset
                                onClick={() => {
                                  if (item.isPinned) {
                                    UnPinHandler(item.messageId);
                                  } else {
                                    PinHandler(item.messageId);
                                  }
                                }}
                              >
                                {!item.isPinned
                                  ? 'Pin Message'
                                  : 'Unpin Message'}
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        </div>
                      );
                    } else {
                      return (
                        <div id={item.messageId}>
                          <MessageBox
                            key={key}
                            date={dayjs(item.date).format('h:mm A')}
                            message={item.chat ?? ''}
                            isPinned={item?.isPinned}
                            messageId={item?.messageId}
                            pinHandler={PinHandler}
                            unPinHandler={UnPinHandler}
                          />
                        </div>
                      );
                    }
                  }
                })}
              </Grid>
            ))}
          </InfiniteScroll>
        </Grid>
        {selectedChat?.ChatRoomStatus !== 'BLOCKED' && (
          <InputLayout hideChat>
            <Flex className="w-6 h-6" align="center" justify="center">
              <input
                className="hidden"
                id="file-input"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.odt,.xls,.xlsx,.csv,.mp3,.wav,.ogg"
                onChange={handleChangeFile}
              />
              <label htmlFor="file-input" className="w-5 h-5">
                <Box>
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    src="/upload/icons/file-input.svg"
                    alt="file input icon"
                  />
                </Box>
              </label>
            </Flex>
            <Flex className="w-6 h-6" align="center" justify="center">
              <div className="w-5 h-5 cursor-pointer">
                <input
                  id="video-input"
                  type={'file'}
                  multiple={false}
                  accept="video/mp4, video/ogg, video/webm, video/mov, .mov"
                  className="hidden"
                  onChange={handleChangeFile}
                />
                <label htmlFor="video-input" className="cursor-pointer">
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    src="/upload/icons/video-icon.svg"
                    alt="file input icon"
                  />
                </label>
              </div>
            </Flex>
            <Flex className="w-6 h-6" align="center" justify="center">
              <label
                htmlFor="image-input"
                onClick={() => {
                  if (imageRef.current) {
                    imageRef.current.click();
                  }
                }}
                className="cursor-pointer w-5 h-5"
              >
                <Image
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  src="/upload/icons/image-input.svg"
                  alt="file input icon"
                />
              </label>
              <input
                id="image-input"
                ref={imageRef}
                type={'file'}
                multiple={true}
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                onChange={handleChooseImage}
              />
            </Flex>
            <Flex className="w-full gap-4">
              <input
                type={'text'}
                inputMode="text"
                placeholder={'Write a message'}
                className="focus:border-none focus:outline-none w-full"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
              <SendBtn onPress={sendHandler} disable={disableSend} />
            </Flex>
          </InputLayout>
        )}
      </Box>
      {socket && images && (
        <ImageEditDialog
          imagesEditDialog={imagesEditDialog}
          setImagesEditDialog={setImagesEditDialog}
          images={images}
          setImages={setImages}
          addHandler={handleChooseImage}
          selectedChat={selectedChat}
          socket={socket}
          messageSize={messageSize}
        />
      )}
    </Box>
  );
};
export default ChatRoom;
