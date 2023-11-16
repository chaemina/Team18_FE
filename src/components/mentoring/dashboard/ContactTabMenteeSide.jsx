import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";

import {
  getContactConnectionsReq,
  deleteConnectionReq,
} from "../../../apis/mentoring/connetion";
import { convertDateToAge } from "../../../utils/age";
import { profileImageAtom } from "../../../store";

import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";
import Button from "../../common/Button";
import CreateProfileModal from "./CreateProfileModal";
import NotPost from "./NotPost";

export default function ContactTabMenteeSide() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModal, setIsModal] = useState(false);
  const [modalUid, setModalUid] = useState(null);
  const defaultImage = useAtomValue(profileImageAtom);

  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContactConnectionsReq,
  });

  const [checks, setChecks] = useState(
    data.data.data.reduce((acc, post) => {
      return { ...acc, [post.connectionId]: false };
    }, {})
  );

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteConnectionReq,
  });

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

  const handleCancelClick = () => {
    if (Object.values(checks).some((val) => val)) {
      if (window.confirm("Are you sure you want to cancel?")) {
        deleteMutate(
          Object.keys(checks).reduce((acc, key) => {
            if (checks[key] === true) return [...acc, key];
            else return [...acc];
          }, []),
          {
            onSuccess: () => {
              toast("Successfully canceled.", {
                className: "bg-[#5A906E] text-[#F2F7F5]",
              });
              queryClient.invalidateQueries({
                queryKey: ["contacts"],
              });
              setChecks(
                data.data.data.reduce((acc, post) => {
                  return { ...acc, [post.connectionId]: false };
                }, {})
              );
            },
          }
        );
      }
    } else
      toast("No mentors have been selected.", {
        className: "bg-[#5A906E] text-[#F2F7F5]",
      });
  };

  const handlePostClick = (e) => {
    const name = e.currentTarget.name;
    navigate(`/mentoring/post/${name}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setModalUid(e.currentTarget.name);
    setIsModal(true);
  };

  return (
    <>
      <table className="text-center">
        {/* 테이블 헤더 */}
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
            {["Country", "Position", "Favorite", "Age", ""].map((val, idx) => (
              <th key={`thead-${idx}`} className="font-medium">
                {val}
              </th>
            ))}
          </tr>
        </thead>
        {/* 테이블 바디(멘토행) */}
        <tbody>
          {data.data.data.map((post, postIdx) => (
            <tr
              key={`mentor-${postIdx}`}
              id={post.postId}
              className="bg-white border"
            >
              <td>
                <input
                  type="checkbox"
                  name={post.connectionId}
                  className="accent-green-600"
                  checked={checks[post.connectionId]}
                  onChange={handleCheckBoxChange}
                />
              </td>
              <td className="p-2 text-left space-x-2 flex items-center">
                <img
                  className="inline object-fill w-8 h-8 rounded-full"
                  src={post.writerDTO.profileImage || defaultImage}
                  alt={`${post.writerDTO.mentorId} 프로필 이미지`}
                ></img>
                <div className="inline-flex flex-col">
                  <span className="font-medium">{post.writerDTO.name}</span>
                  <span className="text-xs text-gray-500">{post.title}</span>
                </div>
              </td>
              <td>
                <FlagTag>{post.writerDTO.country}</FlagTag>
              </td>
              <td>
                <Tag>{post.writerDTO.role}</Tag>
              </td>
              <td className="space-x-2">
                {post.writerDTO.favorites.map((favorite, index) => (
                  <Tag key={`mentortag-${index}`}>{favorite}</Tag>
                ))}
              </td>
              <td>
                <Tag>{convertDateToAge(post.writerDTO.birthDate) + ""}</Tag>
              </td>
              <td className="p-2 text-right space-x-2">
                <button name={post.postId} onClick={handlePostClick}>
                  <span className="material-symbols-outlined text-gray-400">
                    file_open
                  </span>
                </button>
                <button
                  name={post.writerDTO.mentorId}
                  onClick={handleProfileClick}
                >
                  <span className="material-symbols-outlined text-gray-400">
                    account_circle
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.data.data.length === 0 && <NotPost />}
      <div className="mt-4 text-right">
        <Button color="white" size="sm" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
      <CreateProfileModal
        isModal={isModal}
        setIsModal={setIsModal}
        uid={modalUid}
      />
    </>
  );
}
