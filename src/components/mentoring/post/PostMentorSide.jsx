import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";

import { deletePostReq, donePostReq } from "../../../apis/mentoring/post";
import {
  acceptConnectionReq,
  refuseConnectionReq,
} from "../../../apis/mentoring/connetion";
import { connectionState } from "../../../constants/mentoring";
import { convertDateToAge } from "../../../utils/age";
import { profileImageAtom } from "../../../store";

import Button from "../../common/Button";
import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";
import NotPost from "./NotPost";

export default function PostMentorSide({ data }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const defaultImage = useAtomValue(profileImageAtom);

  const isDelete = !data.connections.some(
    (connection) => connection.state !== connectionState.AWAIT
  );

  const [checks, setChecks] = useState(
    data.connections.reduce((acc, connection) => {
      if (connection.state === connectionState.AWAIT)
        return { ...acc, [connection.connectionId]: false };
      else return acc;
    }, {})
  );

  const handleCheckBoxChange = (e) => {
    const name = e.target.name;
    if (name === "all") {
      setChecks(
        Object.keys(checks).reduce(
          (acc, key) => ({ ...acc, [key]: e.target.checked }),
          {}
        )
      );
    } else {
      setChecks((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const { mutate: deleteMutate } = useMutation({ mutationFn: deletePostReq });

  const { mutate: doneMutate } = useMutation({ mutationFn: donePostReq });

  const { mutate: acceptMutate } = useMutation({
    mutationFn: acceptConnectionReq,
  });

  const { mutate: refuseMutate } = useMutation({
    mutationFn: refuseConnectionReq,
  });

  const handleEditlClick = () => {
    navigate(`/mentoring/edit/${data.postId}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutate(data.postId, {
        onSuccess: () => {
          toast("Successfully deleted.", {
            className: "bg-[#5A906E] text-[#F2F7F5]",
          });
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          navigate("/mentoring/posts");
        },
      });
    }
  };

  const handleDoneClick = () => {
    if (window.confirm("Are you sure you want to close this post?"))
      doneMutate(data.postId, {
        onSuccess: (res) => {
          console.dir(res);
          toast("Successfully closed.", {
            className: "bg-[#5A906E] text-[#F2F7F5]",
          });
          queryClient.invalidateQueries({ queryKey: ["post"] });
        },
      });
  };

  const handleAcceptClick = () => {
    if (Object.values(checks).some((val) => val)) {
      if (window.confirm("Are you sure you want to accept mentees?"))
        acceptMutate(
          Object.keys(checks).reduce((acc, key) => {
            if (checks[key] === true) return [...acc, key];
            else return [...acc];
          }, []),
          {
            onSuccess: () => {
              toast("Successfully accepted.", {
                className: "bg-[#5A906E] text-[#F2F7F5]",
              });
              queryClient.invalidateQueries({
                queryKey: ["post"],
              });
              setChecks(
                data.connections.reduce((acc, connection) => {
                  if (connection.state === connectionState.AWAIT)
                    return { ...acc, [connection.connectionId]: false };
                  else return acc;
                }, {})
              );
            },
          }
        );
    } else
      toast("No mentees have been selected.", {
        className: "bg-[#5A906E] text-[#F2F7F5]",
      });
  };

  const handleRefuseClick = () => {
    if (Object.values(checks).some((val) => val)) {
      if (window.confirm("Are you sure you want to refuse mentees?"))
        refuseMutate(
          Object.keys(checks).reduce((acc, key) => {
            if (checks[key] === true) return [...acc, key];
            else return [...acc];
          }, []),
          {
            onSuccess: () => {
              toast("Successfully refused.", {
                className: "bg-[#5A906E] text-[#F2F7F5]",
              });
              queryClient.invalidateQueries({
                queryKey: ["post"],
              });
              setChecks(
                data.connections.reduce((acc, connection) => {
                  if (connection.state === connectionState.AWAIT)
                    return { ...acc, [connection.connectionId]: false };
                  else return acc;
                }, {})
              );
            },
          }
        );
    } else
      toast("No mentees have been selected.", {
        className: "bg-[#5A906E] text-[#F2F7F5]",
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
              <span className="space-x-2">
                <Button color="white" size="base" onClick={handleEditlClick}>
                  Edit
                </Button>
                <Button
                  color="white"
                  size="base"
                  onClick={isDelete ? handleDeleteClick : handleDoneClick}
                >
                  {isDelete ? "Delete" : "Done"}
                </Button>
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
              <th>
                <input
                  type="checkbox"
                  name="all"
                  className="accent-green-600"
                  checked={
                    Object.values(checks).length !== 0 &&
                    Object.values(checks).every((val) => val === true)
                  }
                  onChange={handleCheckBoxChange}
                />
              </th>
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
                <td>
                  <input
                    type="checkbox"
                    name={connection.connectionId}
                    className="accent-green-600"
                    checked={checks[connection.connectionId]}
                    onChange={handleCheckBoxChange}
                    disabled={connection.state !== connectionState.AWAIT}
                  />
                </td>
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
        {/* 최하단 멘토링 신청자 관리 */}
        <div className="mt-4 text-right space-x-2">
          <Button color="white" size="sm" onClick={handleAcceptClick}>
            Accept
          </Button>
          <Button color="white" size="sm" onClick={handleRefuseClick}>
            Refuse
          </Button>
        </div>
      </div>
    </div>
  );
}
