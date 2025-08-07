import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateNotificationForm,
  NotificationAppFunctionListData,
  NotificationDetailData,
  NotificationListData,
} from '../../types/notification.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getNotification: builder.query<
        APIResponse<NotificationListData[]>,
        { pageIndex?: number; rowPerPage?: number; word?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/notification?${params}`,
          };
        },
        providesTags: ['NOTIFICATIONS'],
      }),
      getNotificationAppFunction: builder.query<
        APIResponse<NotificationAppFunctionListData[]>,
        void
      >({
        query: () => {
          return {
            url: `/notification/app-function`,
          };
        },
        providesTags: ['NOTIFICATION_APP_FUNCTION'],
      }),
      getNotificationDetail: builder.query<
        APIResponse<NotificationDetailData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/notification/${payload.id}`,
          };
        },
        providesTags: ['NOTIFICATION_DETAIL'],
      }),

      createNotification: builder.mutation<
        APIResponse<NotificationListData>,
        { notifications: CreateNotificationForm[] }
      >({
        query: (payload) => {
          return {
            url: '/notification/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['NOTIFICATIONS'],
      }),
      updateNotificationPin: builder.mutation<
        APIResponse<NotificationListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/notification/update-pin/${payload.id}`,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['NOTIFICATIONS', 'NOTIFICATION_DETAIL'],
      }),
    };
  },
});

export const {
  useGetNotificationQuery,
  useGetNotificationAppFunctionQuery,
  useGetNotificationDetailQuery,
  useCreateNotificationMutation,
  useUpdateNotificationPinMutation,
} = extendedProductApi;
