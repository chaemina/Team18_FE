import Modal from "react-modal";
import { useAtom, useAtomValue } from "jotai";
import { getChannelDetail, joinChannel } from "../../../apis/chatting/talkplus";
import { useMutation, useQuery } from "@tanstack/react-query";
import { channelIdAtom } from "../../../store/chatting/chatting";
import Button from "../../common/Button";
import Tag from "../../common/Tag";

const customStyles = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "calc(100% - 50rem)",
    minWidth: "50%",
    height: "80vh",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  overlay: {
    padding: "0",
    position: "fixed",
    height: "100%",
  },
};

const ChannelDetailModal = ({ modalIsOpen, handleModalClose }) => {
  const [channelId, setChannelId] = useAtom(channelIdAtom);

  const {
    data: channelInfo,
    isLoading,
    isError,
  } = useQuery(
    ["channelDetail", channelId, modalIsOpen],
    () => getChannelDetail(channelId),
    {
      enabled: !!channelId,
    }
  );

  const { mutate: joinChannelMutate } = useMutation(
    () => joinChannel(channelInfo.id),
    {
      onSettled: () => {
        handleModalClose();
        setChannelId("");
      },
    }
  );

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      contentLabel="Channel Detail Modal"
      style={customStyles}
      ariaHideApp={false}
    >
      <article className="grid grid-rows-[50%_4fr_1fr] gap-8 h-full p-2">
        {channelInfo?.imageUrl ? (
          <div className="flex w-full h-full overflow-hidden justify-center">
            <img src={channelInfo.imageUrl} alt="채널 이미지" />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-300"></div>
        )}
        <section>
          <section className="flex justify-between w-full items-center mb-3">
            <p className="text-2xl font-bold ">{channelInfo.name}</p>
            <p className="text-gray-400 text-sm">
              {channelInfo.memberCount} people
            </p>
          </section>
          <section className="flex mb-6 gap-2">
            {channelInfo.category && <Tag>{channelInfo.category}</Tag>}
            {channelInfo.subcategory && <Tag>{channelInfo.subcategory}</Tag>}
          </section>
          <p className="text-gray-700">
            {channelInfo.data?.content ? channelInfo.data.content : ""}
          </p>
        </section>
        <section className="w-full flex justify-end">
          <Button color="orange" size="base" onClick={joinChannelMutate}>
            참여하기
          </Button>
        </section>
      </article>
    </Modal>
  );
};
export default ChannelDetailModal;
