import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";

import {
  addConnectionReq,
  deleteConnectionReq,
} from "../../../apis/mentoring/connetion";
import { authAtom, uidAtom, profileImageAtom } from "../../../store";
import { connectionState } from "../../../constants/mentoring";
import { convertDateToAge } from "../../../utils/age";

import Button from "../../common/Button";
import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";
import NotPost from "./NotPost";

export default function PostMenteeSide({ data }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAtomValue(authAtom);
  const uid = useAtomValue(uidAtom);
  const defaultImage = useAtomValue(profileImageAtom);

  const myConnection = data.connections.find(
    (connection) => connection.mentee.menteeId === uid
  );

  const { mutate: addMutate } = useMutation({ mutationFn: addConnectionReq });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteConnectionReq,
  });

  const handleApplylClick = () => {
    const reqData = {
      menteeId: uid,
      mentorId: data.writerDTO.mentorId,
      mentorPostId: data.postId,
    };
    if (auth) {
      addMutate(reqData, {
        onSuccess: () => {
          toast("Successfully applied.", {
            className: "bg-[#5A906E] text-[#F2F7F5]",
          });
          queryClient.invalidateQueries({
            queryKey: ["post"],
          });
        },
      });
    } else {
      if (
        window.confirm(
          "This service requires a login.\nWould you like to log in?"
        )
      )
        navigate("/users/login");
    }
  };

  const handleCancelClick = () => {
    if (window.confirm("Are you sure you want to cancel?"))
      deleteMutate([myConnection.connectionId], {
        onSuccess: () => {
          toast("Successfully canceled.", {
            className: "bg-[#5A906E] text-[#F2F7F5]",
          });
          queryClient.invalidateQueries({
            queryKey: ["post"],
          });
        },
      });
  };

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
              {(!myConnection ||
                myConnection.state == connectionState.AWAIT) && (
                <Button
                  color="white"
                  size="base"
                  onClick={
                    !myConnection ? handleApplylClick : handleCancelClick
                  }
                >
                  {!myConnection ? "Apply" : "Cancel"}
                </Button>
              )}
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
