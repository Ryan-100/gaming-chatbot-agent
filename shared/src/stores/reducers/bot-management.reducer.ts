import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { ApplicationSettingEditForm } from '../../types/application-settings.types';
import {
  BotManagementList,
  CreateBotManagementForm,
} from '../../types/bot-management.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getBotManagement: builder.query<
        APIResponse<BotManagementList>,
        {
          type:
            | 'WELCOME'
            | 'BEFORE_LOGIN'
            | 'AFTER_LOGIN'
            | 'DOWNLOAD'
            | 'APP_LINK';
          downloadType?: 'APP_STORE' | 'PLAY_STORE' | 'DIRECT_DOWNLOAD';
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/bot-management?${params}`,
          };
        },
        providesTags: ['BOT_MANAGEMENT'],
      }),
      updateBotManagement: builder.mutation<
        APIResponse<ApplicationSettingEditForm>,
        { botMangements: CreateBotManagementForm[] }
      >({
        query: (payload) => {
          return {
            url: `/bot-management/update`,
            body: payload,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['BOT_MANAGEMENT'],
      }),
    };
  },
});

export const { useGetBotManagementQuery, useUpdateBotManagementMutation } =
  extendedProductApi;
