import { useInfiniteQuery } from "@tanstack/react-query";
import ChannelListItem from "./ChannelListItem";
import { getJoinedChannels } from "../../../apis/chatting/talkplus";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import SearchInput from "./SearchInput";

const JoinedChannelList = () => {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSearchSubCategory] = useState("");

  const { ref, inView } = useInView();
  const debouncedSearchCategory = useDebounce(searchCategory, 500);
  const deboncedSearchSubCategory = useDebounce(searchSubCategory, 500);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["joinedChannels", debouncedSearchCategory, deboncedSearchSubCategory],
      ({ pageParam = "" }) =>
        getJoinedChannels({
          lastChannelId: pageParam,
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

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div>
      <p className="font-bold text-2xl">My Channel List</p>
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
                <div
                  key={channel.id}
                  className="flex justify-between border-b-2 p-2"
                >
                  <Link to={`/chatting/room/${channel.id}`}>
                    <ChannelListItem data={channel} />
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div ref={ref}></div>
    </div>
  );
};
export default JoinedChannelList;
