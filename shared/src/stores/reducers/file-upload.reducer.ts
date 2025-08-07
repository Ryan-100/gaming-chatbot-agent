import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { CreateFile, UpdateFile, FileData } from '../../types/file-upload.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      createFile: builder.mutation<
        APIResponse<FileData>,
        CreateFile
      >({
        query: (payload) => {
          const formData = new FormData();
          formData.append('file', payload.file);
          return {
            url: `/file/upload/admin`,
            body: formData,
            method: 'POST',
          };
        },
        invalidatesTags: ['FILE_UPLOAD'],
      }),

      updateFile: builder.mutation<
        APIResponse<FileData>,
        { id: string; data: UpdateFile }
      >({
        query: (payload) => {
          const formData = new FormData();
          formData.append('file', payload.data.file);
          return {
            url: `/file/update/admin/${payload.id}`,
            body: formData,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['FILE_UPLOAD'],
      }),
    };
  },
});

export const {
  useCreateFileMutation,
  useUpdateFileMutation,
} = extendedProductApi;
