import { useAtomValue } from "jotai";

import { profileImageAtom } from "../../../store";
import { convertDateToAge } from "../../../utils/age";

import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";
import NotPost from "./NotPost";

export default function PostDoneSide({ data }) {
  const defaultImage = useAtomValue(profileImageAtom);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[58rem] m-12 flex flex-col">
        {/* 상단 - 멘토 정보 및 멘토링 제목 */}
        <div className="w-full h-fit flex">
          <img
            className="flex-shrink-0 object-fill w-56 h-56 p-8 rounded-full"
            src={data.writerDTO.profileImage || defaultImage}
            alt="작성자 프로필 이미지"
          ></img>
          <div className="w-full px-4 flex flex-col justify-center space-y-3">
            <h1 className="text-4xl font-bold text-green-700">{data.title}</h1>
            <span className="text-sm text-gray-500">{data.writerDTO.name}</span>
            <div className="pr-4 flex justify-between items-center">
              <span className="flex items-center space-x-2">
                <FlagTag>{data.writerDTO.country}</FlagTag>
                <Tag>{data.writerDTO.role}</Tag>
                {data.writerDTO.interests.map((interest, index) => (
                  <Tag key={`writertag-${index}`}>{interest}</Tag>
                ))}
              </span>
            </div>
          </div>
        </div>
        {/* 중단 멘토링 내용 */}
        <div className="mb-8 px-6 py-12 bg-white">{data.content}</div>
        {/* 하단 멘토링 신청자 목록 */}
        <table className="text-center">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="p-2 text-left font-medium">Name</th>
              {["Country", "Favorite", "Age", "State"].map((val) => (
                <th key={`table-${val}`} className="font-medium">
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.connections.map((connection, index) => (
              <tr key={`mentee-${index}`} className="bg-white border">
                <td className="p-2 text-left space-x-2">
                  <img
                    className="inline object-fill w-8 h-8 rounded-full"
                    src={connection.mentee.profileImage || defaultImage}
                    alt={`${connection.mentee.menteeId} 프로필 이미지`}
                  ></img>
                  <span className="font-medium">{connection.mentee.name}</span>
                </td>
                <td>
                  <FlagTag>{connection.mentee.country}</FlagTag>
                </td>
                <td className="space-x-2">
                  {connection.mentee.interests.map((interest, index) => (
                    <Tag key={`menteetag-${index}`}>{interest}</Tag>
                  ))}
                </td>
                <td>
                  <Tag>
                    {convertDateToAge(connection.mentee.birthDate) + ""}
                  </Tag>
                </td>
                <td>
                  <Tag>{connection.state}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.connections.length === 0 && <NotPost />}
      </div>
    </div>
  );
}
