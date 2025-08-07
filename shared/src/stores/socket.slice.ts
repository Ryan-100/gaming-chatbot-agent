import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { getToken } from '../utils/auth';
import { API_URL } from '../lib/api';
import { apiSlice } from './api.slice';
import { addChat, addPinnedChat, addUnReadRoom } from './reducers/chat.reducer';
import { getStatus } from '../utils/getFileType';
import { AppDispatch, useAppSelector } from '.';

export const useSocket = () => {
  const token = getToken();

  const dispatch: AppDispatch = useDispatch();
  const messageSize = useAppSelector((state) => state.chat.messageSize);
  const roomId = useAppSelector((state) => state.chat.roomId);

  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const setUpSocket = async () => {
      try {
        const socket = io(`${API_URL}/admin`, {
          extraHeaders: { authorization: `Bearer ${token}` },
        });
        socketRef.current = socket;
        setSocket(socket);
        if (socket) {
          socket.on('connect', () => {
            console.log('Connected to WebSocket');
          });
          socket.on('admin-deposit-request', (arg) => {
            console.log(arg);
            dispatch(apiSlice.util.invalidateTags(['TRANSACTIONS_DEPOSIT']));
          });
          socket.on('admin-withdraw-request', (arg) => {
            console.log(arg);
            dispatch(apiSlice.util.invalidateTags(['TRANSACTIONS_WITHDRAW']));
          });
          socket.on('active-player-changed', () => {
            dispatch(apiSlice.util.invalidateTags(['PLAYERS']));
          });
          socket.on('new-message', (event) => {
            dispatch(apiSlice.util.invalidateTags(['CHAT_ROOMS_LIST']));
            if (event.chatRoomId !== roomId) {
              dispatch(addUnReadRoom(event.chatRoomId));
            }
            if (!!roomId && event.chatRoomId === roomId) {
              socket.emit('get-messages', {
                roomId: event.chatRoomId ?? '',
                page: 1,
                size: messageSize,
              });
            }
          });
          socket.on('get-messages', (event) => {
            dispatch(apiSlice.util.invalidateTags(['CHAT_ROOMS_LIST']));
            const updated = event.flatMap((item: any) => {
              const attachments = item.Attachment.flatMap(
                (att: any) => att?.File?.url
              );
              if (item?.Attachment?.length > 0) {
                return {
                  type: item?.sender === 'ADMIN' ? 'sender' : 'receiver',
                  status: getStatus(item?.content),
                  attachment: attachments,
                  caption: item?.caption ?? '',
                  chat: item?.content ?? '',
                  date: item?.createdAt,
                  chatRoomId: item.chatRoomId,
                  messageId: item.id,
                  isPinned: item.isPinned,
                };
              } else {
                return {
                  type: item?.sender === 'ADMIN' ? 'sender' : 'receiver',
                  status: getStatus(item?.content),
                  attachment: '',
                  caption: item?.caption ?? '',
                  chat: item?.content ?? '',
                  date: item?.createdAt,
                  chatRoomId: item.chatRoomId,
                  messageId: item.id,
                  isPinned: item.isPinned,
                };
              }
            });
            dispatch(addChat(updated.reverse()));
          });
          socket.on('get-pinned-messages', (event) => {
            const updated = event.flatMap((item: any) => {
              const attachments = item.Attachment?.flatMap(
                (att: any) => att?.File?.url
              );
              if (item?.Attachment?.length > 0) {
                return {
                  type: item?.sender === 'ADMIN' ? 'sender' : 'receiver',
                  status: getStatus(item?.content),
                  attachment: attachments,
                  caption: item?.caption ?? '',
                  chat: item?.content ?? '',
                  date: item?.createdAt,
                  chatRoomId: item.chatRoomId,
                  messageId: item.id,
                  isPinned: item.isPinned,
                };
              } else {
                return {
                  type: item?.sender === 'ADMIN' ? 'sender' : 'receiver',
                  status: getStatus(item?.content),
                  attachment: '',
                  caption: item?.caption ?? '',
                  chat: item?.content ?? '',
                  date: item?.createdAt,
                  chatRoomId: item.chatRoomId,
                  messageId: item.id,
                  isPinned: item.isPinned,
                };
              }
            });
            dispatch(addPinnedChat(updated.reverse()));
          });
        }

        return () => {
          if (socket) {
            socket?.off('connect');
            socket?.off('admin-deposit-request');
            socket?.off('admin-withdraw-request');
            socket?.off('disconnect');
            socket.disconnect();
          }
        };
      } catch (err) {
        console.error('Error setting up WebSocket:', err);
      }
    };
    setUpSocket();
  }, [dispatch]);
  return { socket };
};
