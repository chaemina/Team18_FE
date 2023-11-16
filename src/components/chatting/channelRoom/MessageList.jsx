import { useInfiniteQuery } from "@tanstack/react-query";
import ReceivedMessage from "./ReceivedMessage";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../../store/chatting/chatting";
import SentMessage from "./SentMessage";
import { getMessages } from "../../../apis/chatting/talkplus";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const MessageList = ({ channelId }) => {
  const scrollRef = useRef(null);
  const { ref, inView } = useInView();

  const userId = useAtomValue(userIdAtom);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
  }, [channelId]);

  const { data, fetchPreviousPage, hasPreviousPage } = useInfiniteQuery(
    ["messages", channelId],
    ({ pageParam = "" }) =>
      getMessages({ channelId, lastMessageId: pageParam }),
    {
      getPreviousPageParam: (firstPage) => {
        if (!firstPage) return undefined;
        if (!firstPage?.hasNext) return undefined;
        const firstMessageId = firstPage.messages[0].id;
        return firstMessageId;
      },
    }
  );

  useEffect(() => {
    if (inView && hasPreviousPage) fetchPreviousPage();
  }, [inView, fetchPreviousPage, hasPreviousPage]);

  return (
    <div
      ref={scrollRef}
      className="bg-white flex flex-col gap-2 px-4 w-full h-[calc(100vh-22rem)] overflow-y-scroll scrollbar-hide shadow-sm border-b-2"
    >
      <div ref={ref}></div>
      {data.pages.map((page, index) => (
        <div key={index}>
          {page?.messages.map((message) =>
            message.userId === userId ? (
              <SentMessage key={message.id} message={message} />
            ) : (
              <ReceivedMessage key={message.id} message={message} />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
