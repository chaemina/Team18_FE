import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";

import { profileImageAtom } from "../../../store";

import Tag from "../../../components/common/Tag";
import FlagTag from "../../../components/common/FlagTag";

export default function PostCard({ post }) {
  const defaultImage = useAtomValue(profileImageAtom);

  return (
    <Link
      className="w-full h-fit border bg-white flex"
      to={`/mentoring/post/${post.postId}`}
    >
      <img
        className="flex-shrink-0 object-fill w-56 h-56 p-8 rounded-full"
        src={post.writerDTO.profileImage || defaultImage}
        alt={`글${post.postId} 작성자 프로필 이미지`}
      ></img>
      <div className="w-full px-4 flex flex-col justify-center space-y-3">
        <span className="text-xl font-semibold">{post.title}</span>
        <span className="text-sm text-gray-500">{post.writerDTO.name}</span>
        <span>{post.content}</span>
        <div className="flex items-center space-x-2">
          <FlagTag>{post.writerDTO.country}</FlagTag>
          <Tag>{post.writerDTO.role}</Tag>
          {post.writerDTO.interests.map((interest, index) => (
            <Tag key={`글${post.postId}tag-${index}`}>{interest}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
