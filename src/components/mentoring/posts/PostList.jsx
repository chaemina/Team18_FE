import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getPostsReq } from "../../../apis/mentoring/post";

import NotPost from "./NotPost";
import PostCard from "./PostCard";
import PostCardSkeletons from "./PostCardSkeletons";

export default function PostList({ category, search }) {
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", category, search],
      queryFn: ({ pageParam = 0 }) => {
        return getPostsReq(category, search, pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.data.length === 0) return undefined;
        return allPages.length;
      },
    });

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) fetchNextPage();
  }, [inView, isLoading, hasNextPage, fetchNextPage]);

  return data.pages[0].data.data.length === 0 ? (
    <NotPost />
  ) : (
    <div className="flex flex-col">
      {data.pages
        .flatMap((page) => page.data.data)
        .map((post, index) => (
          <PostCard key={`postcard-${index}`} post={post} />
        ))}
      {isFetchingNextPage && <PostCardSkeletons />}
      <div ref={ref}></div>
    </div>
  );
}
