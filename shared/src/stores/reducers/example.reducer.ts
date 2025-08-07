import { SuccessResponse } from '../../types/base.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api.slice';
import {
  Category,
  CategoryDetailResponse,
  CategoryResponse,
  CreateCategoryForm,
  UpdateCategoryForm,
} from '../../types/example.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

interface InitialState {
  selectedCategory: Category | null;
}

const initialState: InitialState = {
  selectedCategory: null,
};

const productSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCategory: builder.query<
        CategoryResponse,
        { page: number; page_size: number; search: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/category-list?${params}`,
          };
        },
        providesTags: ['EXAMPLES'],
      }),
      categoryDetail: builder.query<
        CategoryDetailResponse,
        { category_id: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/category-list?${params}`,
          };
        },
      }),
      createCategory: builder.mutation<SuccessResponse, CreateCategoryForm>({
        query: (payload) => {
          return {
            url: '/create-category',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['EXAMPLES'],
      }),
      updateCategory: builder.mutation<
        SuccessResponse,
        { id: string; data: UpdateCategoryForm }
      >({
        query: (payload) => {
          return {
            url: `/edit-category/${payload.id}`,
            body: payload.data,
            method: 'POST',
          };
        },
        invalidatesTags: ['EXAMPLES'],
      }),
    };
  },
});

export const {
  useGetCategoryQuery,
  useCategoryDetailQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = extendedProductApi;
export const { setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
