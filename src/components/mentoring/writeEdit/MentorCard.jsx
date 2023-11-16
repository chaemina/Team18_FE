import { useAtomValue } from "jotai";

import { profileImageAtom } from "../../../store";

import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";

export default function MentorCard({ info }) {
  const defaultImage = useAtomValue(profileImageAtom);
  const name = info.name || `${info.firstName} ${info.lastName}`;
  const interests = info.interests || info.categoryList;

  return (
    <div className="w-fit py-3 flex items-end space-x-2">
      <img
        className="object-fill inline w-12 h-12 rounded-full"
        src={info.profileImage || defaultImage}
        alt={`프로필 이미지`}
      />
      <div className="inline-flex items-center space-x-2">
        <span className="text-sm">{name}</span>
        <FlagTag>{info.country}</FlagTag>
        <Tag>{info.role}</Tag>
        {interests.map((interest, index) => (
          <Tag key={`tag-${index}`}>{interest}</Tag>
        ))}
      </div>
    </div>
  );
}
