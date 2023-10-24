import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<IComment[], number>({
      query: (postId) => ({
        url: 'comments',
        params: {
          _limit: 12,
          _sort: 'id',
          _order: 'desc',
          postId,
        },
      }),
    }),
  }),
});

export const { useGetCommentsByPostIdQuery } = commentsApi;
