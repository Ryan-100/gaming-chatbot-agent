import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { ChatRoomListData, PlayerMediaData } from '../../types/chat.types';

export interface IMessagePayload {
  type: 'sender' | 'receiver';
  status: 'message' | 'image' | 'document' | 'video' | 'audio';
  caption?: string;
  chat?: string;
  date: string;
  chatRoomId?: string;
  attachment?: string;
  messageId?: string;
  isPinned?: boolean;
}

interface IMessageState {
  value: IMessagePayload[];
  messageSize: number;
  roomId: string;
  unReadRoom: string[];
  pinnedChat: IMessagePayload[];
}

const initialState: IMessageState = {
  value: [],
  messageSize: 50,
  roomId: '',
  unReadRoom: [],
  pinnedChat: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<IMessagePayload[]>) => {
      state.value = action.payload;
    },
    newChat: (state, action: PayloadAction<IMessagePayload>) => {
      state.value = [...state.value, action.payload];
    },
    changeMessageSize: (state, action: PayloadAction<number>) => {
      state.messageSize = action.payload;
    },
    selectRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    addUnReadRoom: (state, action: PayloadAction<string>) => {
      const room = action.payload;
      if (!state.unReadRoom.includes(room)) {
        state.unReadRoom = [...state.unReadRoom, room];
      }
    },
    removeUnReadRoom: (state, action: PayloadAction<string>) => {
      const room = action.payload;
      state.unReadRoom = state.unReadRoom.filter((r) => r !== room);
    },
    addPinnedChat: (state, action: PayloadAction<IMessagePayload[]>) => {
      state.pinnedChat = action.payload;
    },
  },
});

export const {
  addChat,
  newChat,
  changeMessageSize,
  selectRoomId,
  addUnReadRoom,
  removeUnReadRoom,
  addPinnedChat,
} = chatSlice.actions;

export default chatSlice.reducer;

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getChatRoomList: builder.query<APIResponse<ChatRoomListData[]>, void>({
        query: (payload) => {
          return {
            url: `/chat-service/chat-room-list`,
          };
        },
        providesTags: ['CHAT_ROOMS_LIST'],
      }),
      sendMessage: builder.mutation<
        APIResponse<void>,
        {
          chatRoomId: string;
          content?: string;
          caption?: string;
          isPinned?: boolean;
          attachments?: File[];
          attachmentType?: string;
        }
      >({
        query: (payload) => {
          const formData = new FormData();
          formData.append('chatRoomId', payload.chatRoomId);
          if (payload.attachments && payload.attachments.length > 0) {
            payload.attachments.forEach((file, index) => {
              formData.append(`attachments`, file);
            });
          }
          if (payload.content) {
            formData.append('content', payload.content);
          }
          if (payload.caption) {
            formData.append('caption', payload.caption);
          }
          if (payload.isPinned !== undefined) {
            formData.append('isPinned', payload.isPinned.toString());
          }
          if (payload.attachmentType !== undefined) {
            formData.append(
              'attachmentType',
              payload.attachmentType.toString()
            );
          }
          return {
            url: `/chat-service/admin-send-message`,
            body: formData,
            method: 'POST',
          };
        },
        invalidatesTags: ['CHAT_ROOMS_LIST'],
      }),
      blockChatPlayer: builder.mutation<
        APIResponse<void>,
        {
          playerId: string;
          reason?: string;
        }
      >({
        query: (payload) => {
          return {
            url: `/chat-service/block-player`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['CHAT_ROOMS_LIST'],
      }),
      unBlockChatPlayer: builder.mutation<
        APIResponse<void>,
        {
          playerId: string;
          reason?: string;
        }
      >({
        query: (payload) => {
          return {
            url: `/chat-service/unblock-player`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['CHAT_ROOMS_LIST'],
      }),
      pinMessage: builder.mutation<APIResponse<void>, { messageId: string }>({
        query: (payload) => {
          return {
            url: `/chat-service/pin-message`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['CHAT_ROOMS_LIST'],
      }),
      unpinMessage: builder.mutation<APIResponse<void>, { messageId: string }>({
        query: (payload) => {
          return {
            url: `/chat-service/unpin-message`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['CHAT_ROOMS_LIST'],
      }),
      getPlayerMedia: builder.query<
        APIResponse<PlayerMediaData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/player/media/${payload.id}`,
          };
        },
        providesTags: ['PLAYER_MEDIA'],
      }),
    };
  },
});

export const {
  useGetChatRoomListQuery,
  useSendMessageMutation,
  useBlockChatPlayerMutation,
  useUnBlockChatPlayerMutation,
  usePinMessageMutation,
  useUnpinMessageMutation,
  useLazyGetPlayerMediaQuery,
} = extendedProductApi;
