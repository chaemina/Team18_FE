import React from "react";
import VideoCard from "../molecules/VideoCard";
import Error from "../../account/atoms/Error";
import Grid from "../atoms/Grid";
import VideoSkeleton from "../atoms/Skeleton";

const VideoGrid = React.forwardRef(
  ({ videos, hasNextPage, isFetchingNextPage, error }, ref) => {
    if (error) {
      return <Error errorMessage={error.errorMessage}></Error>;
    }
    if (!videos || videos.length === 0) {
      return <p>유효한 데이터가 없습니다.</p>;
    }

    return (
      <>
        <Grid>
          {videos.map((page, i) => (
            <React.Fragment key={i}>
              {page?.videos?.response?.map((video) => (
                <VideoCard key={video.videoId} video={video} />
              ))}
            </React.Fragment>
          ))}
        </Grid>
        <div ref={ref} style={{ height: "100px" }}>
          {isFetchingNextPage ? (
            <VideoSkeleton />
          ) : hasNextPage ? (
            <VideoSkeleton />
          ) : (
            "마지막 페이지입니다."
          )}
        </div>
      </>
    );
  }
);

export default VideoGrid;
