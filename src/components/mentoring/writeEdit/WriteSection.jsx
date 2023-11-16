import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useInputsState } from "../../../hooks/useInputsState";
import { getUserInfoReq, addPostReq } from "../../../apis/mentoring/post";

import MentorCard from "./MentorCard";
import Button from "../../common/Button";

export default function WriteSection() {
  const navigate = useNavigate();
  const { inputValue, handleInputChange } = useInputsState({
    title: "",
    content: "",
  });

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfoReq,
  });

  const { mutate } = useMutation({
    mutationFn: addPostReq,
  });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (title.length > 50) e.target.value = title.slice(0, 50);
    handleInputChange(e);
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length > 300) e.target.value = content.slice(0, 300);
    handleInputChange(e);
  };

  const handlePostClick = () => {
    if (inputValue.title && inputValue.content) {
      mutate(inputValue, {
        onSuccess: (res) => {
          toast("Successfully written.", {
            className: "bg-[#5A906E] text-[#F2F7F5]",
          });
          navigate(`/mentoring/post/${res.data.data.postId}`);
        },
      });
    } else
      toast("No title or content has been written.", {
        className: "bg-[#5A906E] text-[#F2F7F5]",
      });
  };

  const handleCancelClick = () => {
    if (inputValue.title || inputValue.content) {
      if (
        confirm(
          "There's something you're writing.\nDo you really want to go back?"
        )
      )
        navigate("/mentoring/posts");
    } else navigate("/mentoring/posts");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[58rem] m-12 p-12 bg-white flex flex-col">
        <h1 className="pb-4 text-center font-bold text-green-700">MENTORING</h1>
        <MentorCard info={data.data.data} />
        <div>
          <input
            name="title"
            className="block w-full p-3 border focus:outline-none text-xl"
            placeholder="Title"
            onChange={handleTitleChange}
            value={inputValue.title}
          />
          <textarea
            name="content"
            className="block w-full h-96 resize-none p-3 border focus:outline-none"
            style={{}}
            placeholder="Find your study mate by writing a post that identifies you! (Maximum 300 characters)"
            onChange={handleContentChange}
            value={inputValue.content}
          />
        </div>
        <div className="py-3 space-x-2">
          <Button color="white" size="sm" onClick={handlePostClick}>
            Post
          </Button>
          <Button color="white" size="sm" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
