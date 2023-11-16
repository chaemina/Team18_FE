import Card from "../atoms/Card";
import Image from "../atoms/Image";
import Title from "../../account/atoms/Title";
import Tag from "../../common/Tag";

const HistoryCard = ({ video }) => {
  return (
    <>
      <Card className="w-full mb-2" to={`/videos/${video.videoID}`}>
        <main className="w-full flex">
          <div className="max-w-[30%]">
            <Image
              className="mb-2 rounded-xl w-full"
              src={video.videoThumbnailUrl}
              alt={video.videoTitleKorean}
            />
          </div>
          <section className="flex w-full justify-between">
            <div className="ml-4 space-y-4">
              <Title className="text-xl text-green-900">
                {video.videoTitleKorean}
              </Title>
              <Title className="text-lg text-paragraph">
                {video.videoTitleEng}
              </Title>
              <div>
                <Tag>{video.interests}</Tag>
              </div>
            </div>

            <p>
              <span className="material-symbols-outlined relative -bottom-1">
                visibility
              </span>{" "}
              {video.views}
            </p>
          </section>
        </main>
      </Card>
    </>
  );
};

export default HistoryCard;
