import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";

import {
  getContactConnectionsReq,
  acceptConnectionReq,
  refuseConnectionReq,
} from "../../../apis/mentoring/connetion";
import { convertDateToAge } from "../../../utils/age";
import { connectionState } from "../../../constants/mentoring";
import { profileImageAtom } from "../../../store";

import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";
import Button from "../../common/Button";
import CreateProfileModal from "./CreateProfileModal";
import NotPost from "./NotPost";

export default function ContactTabMentorSide() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModal, setIsModal] = useState(false);
  const [modalUid, setModalUid] = useState(null);
  const defaultImage = useAtomValue(profileImageAtom);

  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContactConnectionsReq,
  });

  const [postVisible, setPostVisible] = useState(
    data.data.data.reduce((acc, post) => ({ ...acc, [post.postId]: false }), {})
  );

  const [checks, setChecks] = useState(
    data.data.data
      .flatMap((post) => post.mentees)
      .reduce((acc, connection) => {
        if (connection.state === connectionState.AWAIT)
          return { ...acc, [connection.connectionId]: false };
        else return acc;
      }, {})
  );

  const { mutate: acceptMutate } = useMutation({
    mutationFn: acceptConnectionReq,
  });

  const { mutate: refuseMutate } = useMutation({
    mutationFn: refuseConnectionReq,
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

  const handleMentorClick = (e) => {
    const id = e.currentTarget.id;
    setPostVisible((prev) => ({ ...prev, [id]: !prev[id] }));
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
                queryKey: ["contacts"],
              });
              setChecks(
                data.data.data
                  .flatMap((post) => post.mentees)
                  .reduce((acc, connection) => {
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
                queryKey: ["contacts"],
              });
              setChecks(
                data.data.data
                  .flatMap((post) => post.mentees)
                  .reduce((acc, connection) => {
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
            {["Country", "Position", "Favorite", "Age", "State", ""].map(
              (val, idx) => (
                <th key={`thead-${idx}`} className="font-medium">
                  {val}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.data.data.map((post, postIdx) => (
            <Fragment key={`mentor-${postIdx}`}>
              {/* 테이블 멘토행 */}
              <tr
                id={post.postId}
                className="bg-white border"
                onClick={handleMentorClick}
              >
                <td></td>
                <td className="p-2 text-left space-x-2">
                  <img
                    className="inline object-fill w-8 h-8 rounded-full"
                    src={post.writerDTO.profileImage || defaultImage}
                    alt={`${post.writerDTO.mentorId} 프로필 이미지`}
                  ></img>
                  <span className="font-medium">{post.title}</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
              {/* 테이블 멘티행 */}
              {postVisible[post.postId] &&
                post.mentees.map((connection, connectIdx) => (
                  <tr
                    key={`mentee-${connectIdx}`}
                    className={`bg-white border${
                      post.mentees.length === connectIdx + 1
                        ? " border-b-4"
                        : ""
                    }`}
                  >
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
                      <span className="font-medium">
                        {connection.mentee.name}
                      </span>
                    </td>
                    <td>
                      <FlagTag>{connection.mentee.country}</FlagTag>
                    </td>
                    <td>
                      <Tag>{connection.mentee.role}</Tag>
                    </td>
                    <td className="space-x-2">
                      {connection.mentee.favorites.map((favorite, index) => (
                        <Tag key={`menteetag-${index}`}>{favorite}</Tag>
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
                    <td className="p-2 text-right">
                      <button
                        name={connection.mentee.menteeId}
                        onClick={handleProfileClick}
                      >
                        <span className="material-symbols-outlined text-gray-400">
                          account_circle
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      {data.data.data.length === 0 && <NotPost />}
      <div className="mt-4 text-right space-x-2">
        <Button color="white" size="sm" onClick={handleAcceptClick}>
          Accept
        </Button>
        <Button color="white" size="sm" onClick={handleRefuseClick}>
          Refuse
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
