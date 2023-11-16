import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { leaveChannel } from "../../../../apis/chatting/talkplus";
import ChannelSettingItemBox from "./ChannelSettingItemBox";
import Button from "../../../common/Button";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../../store/chatting/chatting";

const ChannelInfo = ({ channelInfo, handleEdit }) => {
  const navigate = useNavigate();

  const userId = useAtomValue(userIdAtom);
  const isOwner = channelInfo.ownerId === userId;

  const { mutate: leaveChannelMutate } = useMutation(
    () => leaveChannel(channelInfo.id),
    {
      onSettled: () => {
        navigate("/chatting/rooms");
      },
    }
  );

  const handleLeave = () => {
    if (window.confirm("채팅방을 정말로 나가시겠습니까?")) {
      leaveChannelMutate();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <ChannelSettingItemBox title="Channel Name">
        <p className="text-xl font-semibold">{channelInfo.name}</p>
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Image">
        <img
          src={channelInfo.imageUrl}
          alt="채널 이미지"
          className="w-48 h-48"
        />
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Description">
        <p className="text-xl font-medium">{channelInfo.data.content}</p>
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Category">
        <p className="text-lg font-semibold">
          Category : {channelInfo.category}
        </p>
        <p className="text-lg font-semibold">
          Sub Category : {channelInfo.subcategory}
        </p>
      </ChannelSettingItemBox>
      <div className="flex gap-4 w-full justify-end sticky bottom-0 bg-white py-4">
        {isOwner && (
          <Button color="orange" size="base" onClick={handleEdit}>
            채팅방 수정
          </Button>
        )}
        <Button color="white" size="base" onClick={handleLeave}>
          채팅방 나가기
        </Button>
      </div>
    </div>
  );
};

export default ChannelInfo;
