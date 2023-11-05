import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoGrid from "../organisms/VideoGrid";
import { getVideos } from "../../../apis/watching/videos";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Error from "../../account/atoms/Error";
import { Suspense } from "react";
import VideoSkeleton from "../atoms/Skeleton";
import { ErrorBoundary } from "react-error-boundary";
import Dropdown from "../../common/Dropdown";
import { CATEGORY } from "../../account/constants/TAGLIST";
import Title from "../../account/atoms/Title";

const VideoList = () => {
  const paramCategory = useParams().category;
  const { ref, inView } = useInView();
  const [category, setCategory] = useState(paramCategory || "IDOL");

  useEffect(() => {
    // 카테고리 변경 시 데이터를 다시 불러오는 로직이 필요하면 여기에 추가
  }, [category]);

  const handleOptionChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["getVideos", category],
      ({ pageParam = 1 }) => {
        return getVideos.fetchPostingsListWithScroll(pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.last) return undefined;
          return allPages.length + 1;
        },
        onSuccess: (data) => {
          console.log(data); // 응답 데이터 확인
        },
        retry: false,
      }
    );

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  return (
    <>
      <Title className="mb-20">Videos by Category</Title>
      <main className="w-[70%]">
        <ErrorBoundary
          fallback={<Error errorMessage="Failed to load video list" />}
        >
          {error ? (
            <Error errorMessage={error.message} />
          ) : (
            <>
              <Suspense fallback={<VideoSkeleton />}>
                <div>
                  <Dropdown
                    name="category"
                    options={CATEGORY.map((c) => c.category)}
                    selected={category}
                    onSelectedChange={handleOptionChange}
                    className="mb-10"
                  />
                  <VideoGrid
                    videos={data?.pages}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    ref={ref}
                    error={error}
                  />
                </div>
              </Suspense>
            </>
          )}
        </ErrorBoundary>
      </main>
    </>
  );
};

export default VideoList;
