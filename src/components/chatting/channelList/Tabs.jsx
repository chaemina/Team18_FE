import { useAtom } from "jotai";
import { currentChannelTypeAtom } from "../../../store/chatting/chatting";
import { CHANNEL_TYPES } from "../../../constants/chatting/CHAT";

const Tabs = ({ handleModalOpen }) => {
  const [channelType, setChannelType] = useAtom(currentChannelTypeAtom);
  const tabNames = Object.values(CHANNEL_TYPES).map(
    (channel) => channel.tabName
  );
  const handleClick = (type) => {
    setChannelType(type);
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex w-full">
        {tabNames.map((type) =>
          type === channelType ? (
            <div
              key={type}
              className="font-semibold text-orange p-3 border-b-2 border-orange min-w-fit cursor-pointer"
            >
              {type}
            </div>
          ) : (
            <div
              key={type}
              className="font-semibold text-gray-500 p-3 border-b-2 min-w-fit"
            >
              <button onClick={() => handleClick(type)}>{type}</button>
            </div>
          )
        )}
        <div className="w-full border-b-2"></div>
      </div>
      <button
        className="flex items-center min-w-fit border-b-2"
        onClick={handleModalOpen}
      >
        <p className="text-sm text-gray-600">Create Channel</p>
        <p className="material-symbols-outlined text-2xl font-black">add</p>
      </button>
    </div>
  );
};
export default Tabs;
