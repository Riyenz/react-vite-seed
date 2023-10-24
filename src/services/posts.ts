import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  image: {
    small: string;
    src: string;
  };
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], string | void>({
      query: (q) => ({
        url: 'posts',
        params: {
          _limit: 12,
          _sort: 'id',
          _order: 'desc',
          q,
        },
      }),
      transformResponse: (posts: IPost[]) =>
        posts.map((post) => {
          return {
            ...post,
            image: {
              small: `https://picsum.photos/seed/${post.id}/10/10`,
              src: `https://picsum.photos/seed/${post.id}/300/300`,
            },
          };
        }),
    }),
    getPostsById: builder.query<IPost, number>({
      query: (id) => `posts/${id}`,
      transformResponse: (post: IPost) => {
        return {
          ...post,
          image: {
            small: `https://picsum.photos/seed/${post.id}/30/10`,
            src: `https://picsum.photos/seed/${post.id}/1200/400`,
          },
        };
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetPostsByIdQuery } = postsApi;
