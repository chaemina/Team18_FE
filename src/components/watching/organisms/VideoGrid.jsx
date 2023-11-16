import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../molecules/VideoCard";
import Error from "../../account/atoms/Error";
import Grid from "../atoms/Grid";
import VideoSkeleton from "../atoms/Skeleton";
import Title from "../../account/atoms/Title";

const VideoGrid = React.forwardRef(
  ({ videos, hasNextPage, isFetchingNextPage, error }, ref) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    if (!videos || videos?.length == 0) {
      return (
        <Title className="text-base text-paragraph mb-20">
          No Category video information!{" "}
        </Title>
      );
    }
    if (error) {
      return <Error errorMessage={error.errorMessage} />;
    }

    return (
      <>
        <Grid>
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </Grid>
        <div ref={ref} style={{ height: "100px" }}>
          {isFetchingNextPage || hasNextPage ? (
            <VideoSkeleton />
          ) : (
            !isFetchingNextPage && !hasNextPage
          )}
        </div>
      </>
    );
  }
);

export default VideoGrid;
