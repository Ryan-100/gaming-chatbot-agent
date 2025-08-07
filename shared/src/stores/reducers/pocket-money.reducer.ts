import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import {
  CreatePocketMoneyForm,
  PocketMoneyDetailsData,
  PocketMoneyListData,
  PocketMoneyTransactionListData,
  playerListForPMData,
  PocketMoneyUpdateDetailsData,
} from '../../types/pocket-money.type';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getActivePM: builder.query<
        APIResponse<PocketMoneyListData[]>,
        { type?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);

          return {
            url: `/pocket-money/active-pm?${params}`,
          };
        },
        providesTags: ['ACTIVE_POCKET_MONEY'],
      }),

      getPMDetails: builder.query<
        APIResponse<PocketMoneyDetailsData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/pocket-money/detail/${payload.id}`,
          };
        },
        providesTags: ['POCKET_MONEY_DETAILS'],
      }),

      getPMTransactions: builder.query<
        APIResponse<PocketMoneyTransactionListData[]>,
        { id: string; rowPerPage: number; pageIndex: number }
      >({
        query: (payload) => {
          const params = objectToQueryString({
            pageIndex: payload.pageIndex,
            rowPerPage: payload.rowPerPage,
          });
          return {
            url: `/pocket-money/transaction/${payload.id}?${params}`,
          };
        },
        providesTags: ['POCKET_MONEY_TRANSACTIONS'],
      }),

      getExpirePM: builder.query<
        APIResponse<PocketMoneyListData[]>,
        { date?: string; pageIndex: number; rowPerPage: number }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/pocket-money/expire-pm?${params}`,
          };
        },
        providesTags: ['EXPIRE_POCKET_MONEY'],
      }),

      getUpcomingPM: builder.query<APIResponse<PocketMoneyListData[]>, void>({
        query: (payload) => {
          return {
            url: `/pocket-money/upcoming-pm`,
          };
        },
        providesTags: ['UPCOMING_POCKET_MONEY'],
      }),

      createPM: builder.mutation<
        APIResponse<PocketMoneyDetailsData>,
        CreatePocketMoneyForm
      >({
        query: (payload) => {
          return {
            url: `/pocket-money`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['ACTIVE_POCKET_MONEY', 'UPCOMING_POCKET_MONEY'],
      }),

      updatePM: builder.mutation<
        APIResponse<PocketMoneyDetailsData>,
        { id: string; data: CreatePocketMoneyForm }
      >({
        query: (payload) => {
          return {
            url: `/pocket-money/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['ACTIVE_POCKET_MONEY', 'UPCOMING_POCKET_MONEY'],
      }),

      getPlayerListForPM: builder.query<
        APIResponse<playerListForPMData[]>,
        { name: string; levelIds: string[] }
      >({
        query: (payload) => {
          const params = objectToQueryString({ name: payload?.name });
          return {
            url: `/pocket-money/player-search?${params}`,
            body: {
              levelIds: payload?.levelIds,
            },
            method: 'POST',
          };
        },
        providesTags: ['PM_PLAYER_LIST'],
      }),

      getUpdatePMDetails: builder.query<
        APIResponse<PocketMoneyUpdateDetailsData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/pocket-money/pm-update/${payload.id}`,
          };
        },
        providesTags: ['POCKET_MONEY_DETAILS'],
      }),
    };
  },
});

export const {
  useGetActivePMQuery,
  useGetExpirePMQuery,
  useGetUpcomingPMQuery,
  useGetPMDetailsQuery,
  useGetPMTransactionsQuery,
  useCreatePMMutation,
  useGetPlayerListForPMQuery,
  useGetUpdatePMDetailsQuery,
  useUpdatePMMutation,
} = extendedProductApi;
