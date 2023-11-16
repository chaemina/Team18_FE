import { useSetAtom } from "jotai";
import { getPublicChannels } from "../../../apis/chatting/talkplus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { channelIdAtom } from "../../../store/chatting/chatting";
import ChannelListItem from "./ChannelListItem";
import { useEffect, useState } from "react";
import ChannelDetailModal from "../modal/ChannelDetailModal";
import { useInView } from "react-intersection-observer";
import SearchInput from "./SearchInput";
import useDebounce from "../../../hooks/useDebounce";

const PublicChannelList = () => {
  const setChannelId = useSetAtom(channelIdAtom);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSearchSubCategory] = useState("");

  const { ref, inView } = useInView();
  const debouncedSearchCategory = useDebounce(searchCategory, 500);
  const deboncedSearchSubCategory = useDebounce(searchSubCategory, 500);

  const handleModalOpen = (id) => {
    setChannelId(id);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setChannelId("");
    setModalIsOpen(false);
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["publicChannels", debouncedSearchCategory, deboncedSearchSubCategory],
    ({ pageParam = "" }) =>
      getPublicChannels({
        pageParam,
        searchValue: debouncedSearchCategory,
        searchSubValue: deboncedSearchSubCategory,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length === 0) return undefined;
        if (!lastPage?.hasNext) return undefined;
        const lastChannelId =
          lastPage.channels[lastPage.channels.length - 1].id;
        return lastChannelId;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="h-fit">
      <ChannelDetailModal
        modalIsOpen={modalIsOpen}
        handleModalClose={handleModalClose}
      />
      <p className="font-bold text-2xl">Public Channel List</p>

      <div className="grid grid-cols-2 my-4 gap-2">
        <SearchInput
          value={searchCategory}
          onChange={setSearchCategory}
          placeholder="Search by Category"
        />
        <SearchInput
          value={searchSubCategory}
          onChange={setSearchSubCategory}
          placeholder="Search by SubCategory"
          disabled={searchCategory === ""}
        />
      </div>
      <div className="w-full h-[90%] overflow-y-scroll scrollbar-hide bg-white">
        {data.pages.map((page, index) => (
          <div key={index}>
            {page?.channels &&
              page.channels.map((channel) => (
                <section
                  key={channel.id}
                  className="flex justify-between border-b-2 p-2"
                  onClick={() => handleModalOpen(channel.id)}
                >
                  <ChannelListItem data={channel} />
                </section>
              ))}
          </div>
        ))}
      </div>
      <div ref={ref}></div>
    </div>
  );
};
export default PublicChannelList;
