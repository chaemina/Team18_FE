import { useState } from "react";
import Button from "../../common/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMessageText } from "../../../apis/chatting/talkplus";

const MessageInput = ({ channelId }) => {
  const queryClient = useQueryClient();

  const [newMessage, setNewMessage] = useState("");

  const { mutate: sendMessageMutate } = useMutation(
    () => addMessageText(channelId, newMessage),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["messages", channelId]);
        setNewMessage("");
      },
    }
  );

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("Send Message");
    sendMessageMutate(channelId, newMessage);
  };

  return (
    <div className="flex gap-4 h-fit w-full bg-white shadow-md p-2">
      <input
        type="text"
        className="w-full h-10 px-4 rounded-sm"
        placeholder="메시지를 입력해주세요."
        value={newMessage}
        onChange={handleNewMessageChange}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <Button color="orange" size="sm" onClick={handleSendMessage}>
        Send
      </Button>
    </div>
  );
};
export default MessageInput;
