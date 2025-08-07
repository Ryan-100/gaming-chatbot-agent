import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateDepositWithdrawAmountForm,
  DepositWithdrawAmountDetailData,
  DepositWithdrawAmountListData,
  UpdateDepositWithdrawAmountForm,
} from '../../types/deposit-withdraw-amount.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDepositWithdrawAmount: builder.query<
        APIResponse<DepositWithdrawAmountListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          type: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/deposit-withdraw-amount?${params}`,
          };
        },
        providesTags: ['DEPOSIT_WITHDRAW_AMOUNT'],
      }),

      getDepositWithdrawAmountDetail: builder.query<
        APIResponse<DepositWithdrawAmountDetailData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/deposit-withdraw-amount/${payload.id}`,
          };
        },
        providesTags: ['DEPOSIT_WITHDRAW_AMOUNT_DETAIL'],
      }),

      createDepositWithdrawAmount: builder.mutation<
        APIResponse<DepositWithdrawAmountListData>,
        CreateDepositWithdrawAmountForm
      >({
        query: (payload) => {
          return {
            url: `/deposit-withdraw-amount/create`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['DEPOSIT_WITHDRAW_AMOUNT'],
      }),

      updateDepositWithdrawAmount: builder.mutation<
        APIResponse<DepositWithdrawAmountListData>,
        { id: string; data: UpdateDepositWithdrawAmountForm }
      >({
        query: (payload) => {
          return {
            url: `/deposit-withdraw-amount/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: [
          'DEPOSIT_WITHDRAW_AMOUNT',
          'DEPOSIT_WITHDRAW_AMOUNT_DETAIL',
        ],
      }),
      deleteDepositWithdrawAmount: builder.mutation<
        APIResponse<void>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/deposit-withdraw-amount/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['DEPOSIT_WITHDRAW_AMOUNT'],
      }),
    };
  },
});

export const {
  useGetDepositWithdrawAmountQuery,
  useGetDepositWithdrawAmountDetailQuery,
  useCreateDepositWithdrawAmountMutation,
  useUpdateDepositWithdrawAmountMutation,
  useDeleteDepositWithdrawAmountMutation,
} = extendedProductApi;
