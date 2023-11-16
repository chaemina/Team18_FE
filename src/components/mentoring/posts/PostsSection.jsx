import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { authAtom } from "../../../store";
import { getUserInfoReq } from "../../../apis/mentoring/post";
import { useInputsState } from "../../../hooks/useInputsState";
import { userRole, searchCategory } from "../../../constants/mentoring";

import Fallback from "../../common/Fallback";
import PostCardSkeletons from "./PostCardSkeletons";
import PostList from "./PostList";
import Button from "../../common/Button";

export default function PostsSection() {
  const navigate = useNavigate();
  const auth = useAtomValue(authAtom);

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfoReq,
    enabled: !!auth,
  });

  const [searchValue, setSearchValue] = useState({
    category: "title",
    search: "",
  });

  const { inputValue, handleInputChange } = useInputsState({
    category: "title",
    search: "",
  });

  const handleWriteClick = () => {
    navigate("/mentoring/write");
  };

  const handleSerchChange = (e) => {
    const search = e.target.value;
    if (search.length > 50) e.target.value = search.slice(0, 50);
    handleInputChange(e);
  };

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) setSearchValue(inputValue);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[58rem] m-16 flex flex-col space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="inline-block text-4xl font-bold text-green-700">
            Mentoring List
          </h1>
          {(!auth || data.data.data.role === userRole.MENTOR) && (
            <Button color="white" size="base" onClick={handleWriteClick}>
              Write
            </Button>
          )}
        </div>
        <div className="p-2 border-b-2 bg-white flex items-center space-x-2 text-sm">
          <select
            className="focus:outline-none"
            name="category"
            onChange={handleInputChange}
            value={inputValue.category}
          >
            {Object.values(searchCategory).map((val) => (
              <option
                key={`category-${val.toLowerCase()}`}
                value={val.toLowerCase()}
              >
                {val}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined">search</span>
          <input
            className="w-full focus:outline-none"
            name="search"
            placeholder="Search"
            onChange={handleSerchChange}
            onKeyUp={handleSearchEnter}
            value={inputValue.search}
          ></input>
        </div>
        <Fallback
          Loader={PostCardSkeletons}
          errorMessage="Failed to load mentoring list"
        >
          <PostList
            category={searchValue.category}
            search={searchValue.search}
          />
        </Fallback>
      </div>
    </div>
  );
}
