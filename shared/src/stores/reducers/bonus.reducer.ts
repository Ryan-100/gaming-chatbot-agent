import { apiSlice } from '../api.slice';
import {
  ActiveBonusData,
  DepositBonusListData,
  DepositBonusDetailsListData,
  RegisterBonusDetailsListData,
  CreateDepositBonusForm,
  RegisterBonusListData,
  CreateRegisterBonusForm,
  UpdateDepositBonusForm,
  UpdateRegisterBonusForm,
  FirstTimeDepositBonusListData,
  CreateFirstTimeDepositBonusForm,
  UpdateFirstTimeDepositBonusForm,
  FirstTimeDepositBonusDetailsListData,
} from '../../types/bonus.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { APIResponse } from '../../types/base.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getActiveBonusList: builder.query<
        APIResponse<ActiveBonusData>,
        { search: string; date: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/bonus-management/get-active-bonuses?${params}`,
          };
        },
        providesTags: ['ACTIVE_BONUS'],
      }),

      getActiveDepositBonusList: builder.query<
        APIResponse<DepositBonusListData[]>,
        void
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/get-active-deposit`,
          };
        },
        providesTags: ['ACTIVE_DEPOSIT_BONUS'],
      }),

      getExpireDepositBonusList: builder.query<
        APIResponse<DepositBonusListData[]>,
        { pageIndex: number; rowPerPage: number; date: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/bonus-management/get-expire-deposit?${params}`,
          };
        },
        providesTags: ['EXPIRE_DEPOSIT_BONUS'],
      }),

      createDepositBonus: builder.mutation<
        APIResponse<void>,
        CreateDepositBonusForm
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/create-deposit-bonus`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['ACTIVE_DEPOSIT_BONUS'],
      }),

      updateDepositBonus: builder.mutation<
        APIResponse<void>,
        { id: string; data: UpdateDepositBonusForm }
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/update-deposit-bonus/${payload.id}`,
            body: payload.data,
            method: 'POST',
          };
        },
        invalidatesTags: ['ACTIVE_DEPOSIT_BONUS', 'DEPOSIT_BONUS_DETAILS'],
      }),

      deleteDepositBonus: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/bonus-management/deposit-bonus-delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['ACTIVE_DEPOSIT_BONUS'],
      }),

      getDepositBonusDetails: builder.query<
        APIResponse<DepositBonusDetailsListData[]>,
        { id: string; search: string; pageIndex: number; rowPerPage: number }
      >({
        query: (payload) => {
          const id = payload.id;
          const paramsToParse = {
            search: payload?.search,
            pageIndex: payload?.pageIndex,
            rowPerPage: payload?.rowPerPage,
          };
          const params = objectToQueryString(paramsToParse);
          return {
            url: `/bonus-management/get-deposit-player/${id}?${params}`,
          };
        },
        providesTags: ['DEPOSIT_BONUS_DETAILS'],
      }),

      getActiveFirstTimeDepositBonusList: builder.query<
        APIResponse<FirstTimeDepositBonusListData[]>,
        void
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/get-active-first-deposit`,
          };
        },
        providesTags: ['ACTIVE_FIRST_TIME_DEPOSIT_BONUS'],
      }),

      getExpireFirstTimeDepositBonusList: builder.query<
        APIResponse<FirstTimeDepositBonusListData[]>,
        { pageIndex: number; rowPerPage: number; date: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/bonus-management/get-expire-first-deposit?${params}`,
          };
        },
        providesTags: ['EXPIRE_FIRST_TIME_DEPOSIT_BONUS'],
      }),

      createFirstTimeDepositBonus: builder.mutation<
        APIResponse<void>,
        CreateFirstTimeDepositBonusForm
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/create-first-deposit-bonus`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['ACTIVE_FIRST_TIME_DEPOSIT_BONUS'],
      }),

      updateFirstTimeDepositBonus: builder.mutation<
        APIResponse<void>,
        { id: string; data: UpdateFirstTimeDepositBonusForm }
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/update-first-deposit-bonus/${payload.id}`,
            body: payload.data,
            method: 'POST',
          };
        },
        invalidatesTags: [
          'ACTIVE_FIRST_TIME_DEPOSIT_BONUS',
          'FIRST_TIME_DEPOSIT_BONUS_DETAILS',
        ],
      }),

      deleteFirstTimeDepositBonus: builder.mutation<
        APIResponse<void>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/deposit-bonus-delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['ACTIVE_FIRST_TIME_DEPOSIT_BONUS'],
      }),

      getFirstTimeDepositBonusDetails: builder.query<
        APIResponse<FirstTimeDepositBonusDetailsListData[]>,
        { id: string; search: string; pageIndex: number; rowPerPage: number }
      >({
        query: (payload) => {
          const id = payload.id;
          const paramsToParse = {
            search: payload?.search,
            pageIndex: payload?.pageIndex,
            rowPerPage: payload?.rowPerPage,
          };
          const params = objectToQueryString(paramsToParse);
          return {
            url: `/bonus-management/get-deposit-player/${id}?${params}`,
          };
        },
        providesTags: ['FIRST_TIME_DEPOSIT_BONUS_DETAILS'],
      }),

      getRegisterBonusDetails: builder.query<
        APIResponse<RegisterBonusDetailsListData[]>,
        { id: string; search: string; pageIndex: number; rowPerPage: number }
      >({
        query: (payload) => {
          const id = payload.id;
          const paramsToParse = {
            search: payload?.search,
            pageIndex: payload?.pageIndex,
            rowPerPage: payload?.rowPerPage,
          };
          const params = objectToQueryString(paramsToParse);
          return {
            url: `/bonus-management/get-reg-player/${id}?${params}`,
          };
        },
        providesTags: ['REGISTER_BONUS_DETAILS'],
      }),

      getActiveRegisterBonusList: builder.query<
        APIResponse<RegisterBonusListData[]>,
        void
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/get-active-reg`,
          };
        },
        providesTags: ['ACTIVE_REGISTER_BONUS'],
      }),

      getExpireRegisterBonusList: builder.query<
        APIResponse<RegisterBonusListData[]>,
        { pageIndex: number; rowPerPage: number; date: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/bonus-management/get-expire-reg?${params}`,
          };
        },
        providesTags: ['EXPIRE_REGISTER_BONUS'],
      }),

      createRegisterBonus: builder.mutation<
        APIResponse<void>,
        CreateRegisterBonusForm
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/create-reg-bonus`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['ACTIVE_REGISTER_BONUS'],
      }),
      updateRegisterBonus: builder.mutation<
        APIResponse<void>,
        { id: string; data: UpdateRegisterBonusForm }
      >({
        query: (payload) => {
          return {
            url: `/bonus-management/update-reg-bonus/${payload.id}`,
            body: payload.data,
            method: 'POST',
          };
        },
        invalidatesTags: ['ACTIVE_REGISTER_BONUS', 'REGISTER_BONUS_DETAILS'],
      }),

      deleteRegisterBonus: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/bonus-management/reg-bonus-delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['ACTIVE_REGISTER_BONUS'],
      }),
    };
  },
});

export const {
  useGetActiveBonusListQuery,
  useGetActiveDepositBonusListQuery,
  useGetExpireDepositBonusListQuery,
  useGetDepositBonusDetailsQuery,
  useCreateDepositBonusMutation,
  useUpdateDepositBonusMutation,
  useDeleteDepositBonusMutation,
  useGetActiveFirstTimeDepositBonusListQuery,
  useGetExpireFirstTimeDepositBonusListQuery,
  useGetFirstTimeDepositBonusDetailsQuery,
  useCreateFirstTimeDepositBonusMutation,
  useUpdateFirstTimeDepositBonusMutation,
  useDeleteFirstTimeDepositBonusMutation,
  useGetActiveRegisterBonusListQuery,
  useGetExpireRegisterBonusListQuery,
  useCreateRegisterBonusMutation,
  useUpdateRegisterBonusMutation,
  useDeleteRegisterBonusMutation,
  useGetRegisterBonusDetailsQuery,
} = extendedProductApi;
