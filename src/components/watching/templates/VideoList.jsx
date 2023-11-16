import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoGrid from "../organisms/VideoGrid";
import { getVideos } from "../../../apis/watching/videos";
import { useInView } from "react-intersection-observer";
import Error from "../../account/atoms/Error";
import { Suspense } from "react";
import VideoSkeleton from "../atoms/Skeleton";
import { ErrorBoundary } from "react-error-boundary";
import Dropdown from "../../common/Dropdown";
import { CATEGORY } from "../../account/constants/TAGLIST";
import Title from "../../account/atoms/Title";
import { nameToCategoryId } from "../utils/categoryId";
import ToastError from "../../common/Toast";
import Fallback from "../../common/Fallback";
import Loader from "../../common/Loader";

const VideoList = () => {
  const { ref, inView } = useInView();
  const [category, setCategory] = useState("IDOL");
  const [openToastError, setOpenToastError] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpenToastError(false);
    }
  };

  const handleOptionChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["getVideos", category],
      ({ pageParam = 0 }) => {
        const categoryId = nameToCategoryId(category);
        return getVideos(pageParam, categoryId);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (!lastPage.isLast) return lastPage.nextPage;
          return undefined;
        },
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          setOpenToastError(true);
          setToastErrorMessage(
            "Error !  Unable to load Videos. Try again in a minute"
          );
        },

        retry: false,
      }
    );

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  const videos = data?.pages.map((page) => page.videos).flat();

  return (
    <>
      <Title className="mt-20 text-base text-paragraph">
        You can choose a video
      </Title>
      <Title className="mb-20">Videos by Category</Title>
      <main className="w-[77%]">
        <Fallback
          Loader={Loader}
          Error={ToastError}
          errorMessage="Error! Unable to load Videos. Try again in a minute "
        >
          {error || openToastError ? (
            <ToastError
              open={openToastError}
              handleClose={handleClose}
              errorMessage={toastErrorMessage}
            />
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<VideoSkeleton />}>
                <div>
                  <Dropdown
                    name="category"
                    options={CATEGORY.map((c) => c.category)}
                    selected={category}
                    onSelectedChange={handleOptionChange}
                    className="border-2 bg-white mb-10"
                  />

                  <VideoGrid
                    videos={videos}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    ref={ref}
                    error={error}
                  />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </Fallback>
      </main>
    </>
  );
};

export default VideoList;
