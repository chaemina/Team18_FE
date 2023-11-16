import ChannelSettingItemBox from "./ChannelSettingItemBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Button from "../../../common/Button";
import { updateChannel } from "../../../../apis/chatting/talkplus";

const ChannelEditForm = ({ channelInfo, handleCancel }) => {
  const queryClient = useQueryClient();
  const { name, data, imageUrl, category, subcategory } = channelInfo;
  const [channelFormData, setChannelFormData] = useState({
    name,
    content: data.content,
    imageUrl,
    category,
    subcategory,
  });

  const { mutate: updateChannelMutate } = useMutation(
    () => updateChannel(channelInfo.id, channelFormData),
    {
      onSettled: () => {
        handleCancel();
        queryClient.invalidateQueries(["channelDetail", channelInfo.id]);
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChannelFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <ChannelSettingItemBox title="Channel Name">
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="name"
          value={channelFormData.name}
          onChange={handleChange}
        />
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Description">
        <textarea
          className="border-2 border-gray-300 rounded-md p-2 h-36 resize-none"
          name="content"
          value={channelFormData.content}
          onChange={handleChange}
        />
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Image">
        <img
          src={channelFormData.imageUrl}
          alt="채널 이미지"
          className="w-48 h-48"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="url"
          name="imageUrl"
          value={channelFormData.imageUrl}
          onChange={handleChange}
        />
      </ChannelSettingItemBox>
      <ChannelSettingItemBox title="Channel Category">
        <section className="flex items-center">
          <p className="text-lg font-semibold">Category :</p>
          <input
            className="border-2 border-gray-300 rounded-md p-2 ml-2"
            type="text"
            name="category"
            value={channelFormData.category}
            onChange={handleChange}
          />
        </section>
        <section className="flex items-center">
          <p className="text-lg font-semibold">Sub Category :</p>
          <input
            className="border-2 border-gray-300 rounded-md p-2 ml-2"
            type="text"
            name="subcategory"
            value={channelFormData.subcategory}
            onChange={handleChange}
          />
        </section>
      </ChannelSettingItemBox>
      <div className="flex gap-4 w-full justify-end sticky bottom-0 bg-white py-4">
        <Button color="orange" size="base" onClick={updateChannelMutate}>
          수정 완료
        </Button>
        <Button color="white" size="base" onClick={handleCancel}>
          취소
        </Button>
      </div>
    </div>
  );
};
export default ChannelEditForm;
