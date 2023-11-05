import Card from "../atoms/Card";
import Image from "../atoms/Image";
import Title from "../../account/atoms/Title";
import Tag from "../../common/Tag";

const VideoCard = ({ video }) => {
  return (
    <Card to={`/videos/${video.videoId}`}>
      <Image
        className="mb-2 rounded-xl"
        src={video.thumbnail}
        alt={video.korean_title}
      />
      <Title className="text-lg text-green-900">{video.korean_title}</Title>
      <p className="mt-2 mb-2 text-gray-500 font-bold text-sm">
        {video.english_title}
      </p>
      <Tag>{video.category}</Tag>
    </Card>
  );
};

export default VideoCard;
