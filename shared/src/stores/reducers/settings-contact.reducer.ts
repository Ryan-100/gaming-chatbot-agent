import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateSettingContactForm,
  SettingContactListData,
  UpdateSettingContactForm,
} from '../../types/settings-contact.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSettingContact: builder.query<
        APIResponse<SettingContactListData[]>,
        { pageIndex?: number; rowPerPage?: number; word?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/setting/support-contact?${params}`,
          };
        },
        providesTags: ['SETTING_CONTACT'],
      }),
      getSettingContactDetail: builder.query<
        APIResponse<SettingContactListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/setting/support-contact/${payload.id}`,
          };
        },
        providesTags: ['SETTING_CONTACT_DETAIL'],
      }),

      createSettingContact: builder.mutation<
        APIResponse<SettingContactListData>,
        CreateSettingContactForm
      >({
        query: (payload) => {
          return {
            url: '/setting/support-contact',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['SETTING_CONTACT'],
      }),
      updateSettingContact: builder.mutation<
        APIResponse<SettingContactListData>,
        { id: string; data: UpdateSettingContactForm }
      >({
        query: (payload) => {
          return {
            url: `/setting/support-contact/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SETTING_CONTACT', 'SETTING_CONTACT_DETAIL'],
      }),
      deleteSettingContact: builder.mutation<APIResponse<void>, { id: string }>(
        {
          query: (payload) => {
            return {
              url: `/setting/support-contact/${payload.id}`,
              method: 'DELETE',
            };
          },
          invalidatesTags: ['SETTING_CONTACT'],
        }
      ),
    };
  },
});

export const {
  useGetSettingContactQuery,
  useGetSettingContactDetailQuery,
  useCreateSettingContactMutation,
  useUpdateSettingContactMutation,
  useDeleteSettingContactMutation,
} = extendedProductApi;
