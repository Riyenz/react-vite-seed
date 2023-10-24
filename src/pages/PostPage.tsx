import { useGetCommentsByPostIdQuery } from '@/services/comments';
import { useGetPostsByIdQuery } from '@/services/posts';

import { Link, useParams } from 'react-router-dom';

import { ChevronLeft } from 'lucide-react';

import { Image } from '@/components/Image';
import { Skeleton } from '@/components/ui/skeleton';

export function PostPage() {
  const { id } = useParams();

  const { data: post, isLoading } = useGetPostsByIdQuery(Number(id));
  const { data: comments, isLoading: isLoadingComments } =
    useGetCommentsByPostIdQuery(Number(id));

  if (!post || isLoading)
    return (
      <>
        <Skeleton className="mb-10 w-full rounded-3xl" />
        <Skeleton className="mb-10 h-12" />
        <Skeleton className="h-10" />
      </>
    );

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <Link
        to="/posts"
        className="flex cursor-pointer items-center gap-1 hover:opacity-80"
      >
        <ChevronLeft className="h-6 w-6 lg:h-8 lg:w-8" />
        <p className="text-lg lg:text-2xl">Back</p>
      </Link>
      <div className="flex flex-col gap-10">
        <Image
          {...post.image}
          alt={post?.title}
          className="aspect-[3/1] w-full rounded-3xl"
        />
        <h1 className="font-black md:text-4xl lg:text-5xl">{post?.title}</h1>
        <p className="md:text-xl lg:text-2xl">{post?.body}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-black md:text-xl lg:text-2xl">Comments</h3>

        <div className="flex flex-col gap-4">
          {isLoadingComments &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-xl bg-slate-300 px-4 py-4"
              >
                <Skeleton className="h-6 w-4/12" />
                <Skeleton className="h-6 w-11/12" />
              </div>
            ))}

          {comments?.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex flex-col gap-2 rounded-xl bg-slate-300 px-4 py-4"
              >
                <p className="font-black md:text-lg lg:text-xl">
                  {comment?.name}
                </p>
                <p className="md:text-base lg:text-lg">{comment?.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
