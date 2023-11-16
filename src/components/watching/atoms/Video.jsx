import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

const Video = ({ video, languages }) => {
  const [player, setPlayer] = useState(null);
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  const findSubtitle = (currentTime) => {
    return video.subtitles.find((sub) => {
      const start = parseFloat(sub.korSubtitleStartTime);
      const end = parseFloat(sub.korSubtitleEndTime);
      return currentTime >= start && currentTime <= end;
    });
  };

  const handleProgress = ({ playedSeconds }) => {
    if (playedSeconds !== null && playedSeconds !== undefined) {
      const currentTime = parseFloat(playedSeconds);

      if (currentTime > parseFloat(video.endTime)) {
        player.seekTo(parseFloat(video.startTime), "seconds");
      }

      const subtitle = findSubtitle(currentTime);
      if (subtitle) {
        let subtitlesToShow = [];
        if (languages.Korean) subtitlesToShow.push(subtitle.korSubtitleContent);
        if (languages.English)
          subtitlesToShow.push(subtitle.engSubtitleContent);

        setCurrentSubtitle(subtitlesToShow.join("\n"));
      } else {
        setCurrentSubtitle("");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
        handleProgress({ playedSeconds: currentTime });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, video.subtitles, languages]);

  return (
    <>
      <ReactPlayer
        ref={setPlayer}
        className="max-w-[100%]"
        url={video.url + `?start=${video.startTime}`}
        playing={true}
        controls={true}
        onProgress={handleProgress}
        height="50%"
      />
      <div className="h-[60px] mt-4">
        <div className="subtitles break-words whitespace-pre-wrap text-xl">
          {currentSubtitle}
        </div>
      </div>
    </>
  );
};

export default Video;
