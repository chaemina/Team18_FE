import React from "react";
import { Skeleton } from "@mui/material";
import Grid from "../atoms/Grid";

const VideoSkeleton = () => {
  return (
    <Grid className="animate-pulse space-x-4">
      {Array.from(new Array(4)).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width={250}
          height={118}
          sx={{
            marginLeft: "20px",
            marginTop: "40px",
            bgcolor: "background.paper",
            boxShadow: "2px -2px 2px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        />
      ))}
    </Grid>
  );
};

export default VideoSkeleton;
