import Button from "../../common/Button";
import ChannelSettingItemBox from "../channelRoom/channelSetting/ChannelSettingItemBox";

const ChannelInfoSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <ChannelSettingItemBox title="Channel Name">
        <div className="w-48 h-6 bg-gray-300 rounded-md" />
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Image">
        <div className="w-48 h-48 bg-gray-300 rounded-md" />
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Description">
        <div className="w-48 h-6 bg-gray-300 rounded-md" />
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Category">
        <div className="w-48 h-6 bg-gray-300 rounded-md" />
        <div className="w-48 h-6 bg-gray-300 rounded-md" />
      </ChannelSettingItemBox>
      <div className="flex gap-4 w-full justify-end sticky bottom-0 bg-white py-4">
        <Button color="orange" size="base" disabled>
          채팅방 수정
        </Button>
        <Button color="white" size="base" disabled>
          채팅방 나가기
        </Button>
      </div>
    </div>
  );
};

export default ChannelInfoSkeleton;
