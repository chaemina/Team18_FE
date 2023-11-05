import Video from "../atoms/Video";
import Tag from "../../common/Tag";
import Button from "../../common/Button";
import { useState } from "react";

const VideoDetailForm = (data) => {
  const [languages, setLanguages] = useState({
    Korean: false,
    English: false,
  });

  const handleLanguageClick = (languageName) => {
    setLanguages((prevLanguages) => ({
      ...prevLanguages,
      [languageName]: !prevLanguages[languageName],
    }));
  };

  return (
    <>
      <main className="relative h-full flex flex-col justify-center w-[70%]">
        <Video data={data?.data?.video} languages={languages} />
        <div className="mt-4 space-y-4">
          <Tag>{data?.data?.video.category}</Tag>
          <div className="space-x-4">
            <Button
              onClick={() => handleLanguageClick("Korean")}
              color={languages.Korean ? "orange" : "white"}
              size="sm"
            >
              Korean
            </Button>
            <Button
              onClick={() => handleLanguageClick("English")}
              color={languages.English ? "orange" : "white"}
              size="sm"
            >
              English
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default VideoDetailForm;
