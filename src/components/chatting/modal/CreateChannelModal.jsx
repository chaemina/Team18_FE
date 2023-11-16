import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createChannel } from "../../../apis/chatting/talkplus";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "calc(100% - 28rem)",
    height: "calc(80%)",
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
  },
};

const CreateChannelModal = ({ modalIsOpen, setModalIsOpen }) => {
  const queryClient = useQueryClient();
  const [createChannelInfo, setCreateChannelInfo] = useState({
    name: "",
    imageUrl: "",
    content: "",
    category: "",
  });

  const { mutate: createChannelMutate } = useMutation(
    () => createChannel(createChannelInfo),
    {
      onSettled: () => {
        queryClient.invalidateQueries("joinedChannels");
        queryClient.invalidateQueries("publicChannels");
      },
    }
  );

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleCreateChannel = () => {
    if (!createChannelInfo.name) {
      alert("채팅방 이름을 입력해주세요");
      return;
    }
    if (!createChannelInfo.imageUrl) {
      alert("채팅방 이미지 URL을 입력해주세요");
      return;
    }
    if (!createChannelInfo.content) {
      alert("채팅방 설명을 입력해주세요");
      return;
    }
    createChannelMutate();
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      contentLabel="Create Channel Modal"
      style={customStyles}
    >
      <div className="flex flex-col gap-4 h-full px-8 py-6">
        <button onClick={handleModalClose} className="w-fit">
          <span className="material-symbols-outlined">close</span>
        </button>
        <p className="text-2xl font-semibold mb-6 w-full text-center">
          채팅방 생성
        </p>
        <input
          type="text"
          placeholder="채팅방 이름을 입력하세요"
          className="border-[1.5px] border-gray-300 rounded-md p-2"
          value={createChannelInfo.name}
          onChange={(e) => {
            setCreateChannelInfo({
              ...createChannelInfo,
              name: e.target.value,
            });
          }}
        />
        <div className="grid grid-cols-[2fr_5fr] gap-2">
          <div className="w-full">
            <img
              src={createChannelInfo.imageUrl}
              onError={(e) => {
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";
              }}
              alt="채널 이미지"
              className="w-full h-52 object-cover"
            />
            <input
              type="url"
              className="border-[1.5px] border-gray-300 rounded-md p-2 w-full"
              placeholder="채팅방 이미지 URL을 입력하세요"
              value={createChannelInfo.imageUrl}
              onChange={(e) => {
                setCreateChannelInfo({
                  ...createChannelInfo,
                  imageUrl: e.target.value,
                });
              }}
            />
          </div>
          <textarea
            className="border-[1.5px] border-gray-300 rounded-md p-2 h-full resize-none"
            placeholder="채팅방 설명을 입력하세요"
            value={createChannelInfo.content}
            onChange={(e) => {
              setCreateChannelInfo({
                ...createChannelInfo,
                content: e.target.value,
              });
            }}
          />
        </div>
        <button
          className="hover:bg-orange rounded-md p-2 mt-4 hover:text-white text-black bg-amber-300 transition-colors duration-300"
          onClick={handleCreateChannel}
        >
          생성
        </button>
      </div>
    </Modal>
  );
};
export default CreateChannelModal;
