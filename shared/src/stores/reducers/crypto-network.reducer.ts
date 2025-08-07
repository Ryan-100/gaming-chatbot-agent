import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateCryptoNetworkForm,
  UpdateCryptoNetworkForm,
  CryptoNetworkListData,
} from '../../types/crypto-network.types';
// import { objectToQueryString } from '../../utils/objectToQueryString';

export const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: builder => {
    return {
      getCryptoNetwork: builder.query<
        APIResponse<CryptoNetworkListData[]>,
        void
      >({
        query: (payload) => {
          return {
            url: `/crypto-network`,
          };
        },
        providesTags: ['CRYPTO_NETWORK'],
      }),

      getCryptoNetworkDetail: builder.query<
        APIResponse<CryptoNetworkListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/crypto-network/${payload.id}`,
          };
        },
        providesTags: ['CRYPTO_NETWORK_DETAIL'],
      }),

      createCryptoNetwork: builder.mutation<
        APIResponse<CryptoNetworkListData>,
        CreateCryptoNetworkForm
      >({
        query: (payload) => {
          return {
            url: '/crypto-network/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['CRYPTO_NETWORK'],
      }),

      updateCryptoNetwork: builder.mutation<
        APIResponse<CryptoNetworkListData>,
        { id: string; data: UpdateCryptoNetworkForm }
      >({
        query: (payload) => {
          return {
            url: `/crypto-network/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['CRYPTO_NETWORK'],
      }),

      deleteCryptoNetwork: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/crypto-network/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['CRYPTO_NETWORK'],
      }),

    }
  }
})

export const {
  useGetCryptoNetworkQuery,
  useGetCryptoNetworkDetailQuery,
  useCreateCryptoNetworkMutation,
  useUpdateCryptoNetworkMutation,
} = extendedProductApi;