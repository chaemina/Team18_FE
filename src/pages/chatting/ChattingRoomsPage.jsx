import { useState } from "react";
import { client, login } from "../../apis/chatting/talkplus";
import { useSetAtom } from "jotai";
import { userIdAtom } from "../../store/chatting/chatting";
import { Link, useParams } from "react-router-dom";
import MessageList from "../../components/chatting/channelRoom/MessageList";
import MessageInput from "../../components/chatting/channelRoom/MessageInput";
import ChannelSetting from "../../components/chatting/channelRoom/channelSetting/ChannelSetting";
import Fallback from "../../components/common/Fallback";
import Error from "../../components/common/Error";
import Loader from "../../components/common/Loader";
import { simpleUserInfo } from "../../apis/mypage";
import { useTalkLogin } from "../../hooks/useTalkLogin";
import ChannelInfoSkeleton from "../../components/chatting/skeleton/ChannelInfoSkeleton";

const ChattingRoomsPage = () => {
  const setUserId = useSetAtom(userIdAtom);
  const [isChannelDetailModalOpen, setIsChannelDetailModalOpen] =
    useState(false);
  const channelId = useParams().roomId;

  const { isLogin, userId } = useTalkLogin(client, simpleUserInfo, login);
  setUserId(userId);

  return (
    <Fallback
      Loader={Loader}
      Error={Error}
      errorMessage="메세지를 불러오는데 실패했습니다."
    >
      {isLogin && (
        <div className="flex w-[95vw] overflow-x-hidden">
          <div className="flex justify-center items-start gap-7 h-fit mt-5 w-full">
            <Link to={`/chatting/rooms`}>
              <span className="material-symbols-outlined text-3xl font-black mt-6">
                arrow_back
              </span>
            </Link>
            <div className="flex flex-col w-[1000px] max-w-full h-fit my-6 relative">
              <span
                className="material-symbols-outlined w-full bg-white font-semibold text-3xl p-2 border-b-2 text-end cursor-pointer"
                onClick={() => setIsChannelDetailModalOpen((prev) => !prev)}
              >
                menu
              </span>
              <Fallback
                Loader={ChannelInfoSkeleton}
                Error={Error}
                errorMessage="Failed to load Channel Information"
              >
                {isChannelDetailModalOpen && (
                  <ChannelSetting channelId={channelId} />
                )}
              </Fallback>
              <Fallback
                Loader={Loader}
                Error={Error}
                errorMessage="Failed to load messages"
              >
                <MessageList channelId={channelId} />
              </Fallback>
              <MessageInput channelId={channelId} />
            </div>
          </div>
        </div>
      )}
    </Fallback>
  );
};

export default ChattingRoomsPage;
