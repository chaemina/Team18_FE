import React from "react";
import { useParams } from "react-router-dom";
import { getDetailVideo } from "../../../apis/watching/videos";
import { useQuery } from "@tanstack/react-query";
import Error from "../../account/atoms/Error";
import Loader from "../../account/atoms/Loader";
import VideoDetailForm from "../organisms/VideoDetailForm";
import SideVideoForm from "../organisms/SideVideoForm";

const VideoDetailtemplate = () => {
  const { videoID } = useParams();
  const { data, isError, error, isLoading } = useQuery(
    ["getDetailVideo", videoID],
    () => getDetailVideo(videoID),
    { enabled: !!videoID, suspense: true }
  );
  if (isError) {
    return <Error errorMessage={"This Video does not exist."} />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <main className="h-[620px] flex">
        <section className="w-3/4 flex justify-center bg-white ">
          <VideoDetailForm data={data} />
        </section>
        <aside className="w-1/4 p-2">
          <SideVideoForm data={data} />
        </aside>
      </main>
    </>
  );
};

export default VideoDetailtemplate;
