import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { getDoneConnectionsReq } from "../../../apis/mentoring/connetion";
import { convertDateToAge } from "../../../utils/age";
import { profileImageAtom } from "../../../store";

import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";
import CreateProfileModal from "./CreateProfileModal";
import NotPost from "./NotPost";

export default function DoneTab() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [modalUid, setModalUid] = useState(null);
  const defaultImage = useAtomValue(profileImageAtom);

  const { data } = useQuery({
    queryKey: ["dones"],
    queryFn: getDoneConnectionsReq,
  });

  const [postVisible, setPostVisible] = useState(
    data.data.data.reduce((acc, post) => ({ ...acc, [post.postId]: false }), {})
  );

  const handleMentorClick = (e) => {
    const id = e.currentTarget.id;
    setPostVisible((prev) => ({ ...prev, [id]: !prev[id] }));
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
            <th className="p-2 text-left font-medium">Name</th>
            {["Country", "Position", "Favorite", "Age", ""].map((val, idx) => (
              <th key={`thead-${idx}`} className="font-medium">
                {val}
              </th>
            ))}
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
                <td className="p-2 text-left space-x-2 flex items-center">
                  <img
                    className="inline object-fill w-8 h-8 rounded-full"
                    src={post.mentor.profileImage || defaultImage}
                    alt={`${post.mentor.mentorId} 프로필 이미지`}
                  ></img>
                  <div className="inline-flex flex-col">
                    <span className="font-medium">{post.mentor.name}</span>
                    <span className="text-xs text-gray-500">{post.title}</span>
                  </div>
                </td>
                <td>
                  <FlagTag>{post.mentor.country}</FlagTag>
                </td>
                <td>
                  <Tag>{post.mentor.role}</Tag>
                </td>
                <td className="space-x-2">
                  {post.mentor.favorites.map((favorite, index) => (
                    <Tag key={`mentortag-${index}`}>{favorite}</Tag>
                  ))}
                </td>
                <td>
                  <Tag>{convertDateToAge(post.mentor.birthDate) + ""}</Tag>
                </td>
                <td className="p-2 text-right space-x-2">
                  <button name={post.postId} onClick={handlePostClick}>
                    <span className="material-symbols-outlined text-gray-400">
                      file_open
                    </span>
                  </button>
                  <button
                    name={post.mentor.mentorId}
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
      <CreateProfileModal
        isModal={isModal}
        setIsModal={setIsModal}
        uid={modalUid}
      />
    </>
  );
}
