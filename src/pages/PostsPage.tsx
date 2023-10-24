import { useGetPostsQuery } from '@/services/posts';

import { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Image } from '@/components/Image';
import { SearchInput } from '@/components/search-input';
import { Skeleton } from '@/components/ui/skeleton';

import { debounce } from '@/lib/utils';

export function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') || undefined;
  const { data, isLoading, isFetching } = useGetPostsQuery(q);

  const onSearch = debounce((e: FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    setSearchParams((sp) => {
      if (inputElement.value) sp.set('q', inputElement.value);
      else sp.delete('q');
      return sp;
    });
  }, 300);

  return (
    <div>
      <div className="mb-10 flex w-full items-center justify-between">
        <h1 className="text-5xl font-black">Latest Posts</h1>

        <SearchInput
          onInput={onSearch}
          isLoading={isFetching}
          placeholder="Search post..."
        />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow"
            >
              <Skeleton className="aspect-square" />
              <div className="flex flex-col px-4 py-4">
                <Skeleton className="mb-4 h-7 w-10/12" />
                <Skeleton className="h-6 w-9/12" />
                <Skeleton className="h-6 w-11/12" />
                <Skeleton className="h-6 w-4/12" />
              </div>
            </div>
          ))}

        {data?.map((post) => {
          return (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow transition-shadow duration-300 hover:shadow-xl"
            >
              <Image
                {...post.image}
                alt={post.title}
                className="aspect-square"
              />
              <div className="px-4 py-4">
                <h3 className="mb-4 text-xl font-bold">{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
