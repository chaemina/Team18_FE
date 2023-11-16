import React from "react";
import Title from "../atoms/Title";
import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";
import { profileImageAtom } from "../../../store";
import { useAtom } from "jotai";

const Profile = ({ data }) => {
  const profile = data?.data?.data;

  const [defaultProfileImage] = useAtom(profileImageAtom);
  const userName = profile.firstName + " " + profile.lastName;
  console.log(profile);
  if (!profile) {
    return <div>존재하지 않는 유저입니다.</div>;
  }

  return (
    <main className="w-full p-6">
      <section className="border-b w-full flex justify-center items-center">
        <Title className="p-2">
          <span className="material-symbols-outlined text-4xl">
            home_and_garden
          </span>
          {userName}
        </Title>
      </section>
      <section className="mt-2 flex justify-center items-center flex-col">
        <img
          className="max-w-[100px]"
          src={profile?.profileImage || defaultProfileImage}
          alt="Profile Image"
        />
        <Title className="text-base p-2">{userName}</Title>
        <div className="w-[300px] p-2 space-y-1 rounded-lg border-2">
          {profile.introduction}
        </div>
        <div className="mt-5 flex space-x-2">
          <FlagTag>{profile.country}</FlagTag>

          <Tag>{profile.role}</Tag>
          {profile.categoryList.map((val, index) => (
            <Tag key={index}>{val}</Tag>
          ))}
        </div>
        <div className="mt-5 min-w-[300px] p-2 space-y-1 border-2 border-orange flex flex-col justify-center items-center">
          <Title className="text-lg text-orange mb-4 font-bold">
            Contact {userName}!
          </Title>
          <p className="text-green-500 font-bold">
            <span className="material-symbols-outlined relative -bottom-2">
              phone_iphone
            </span>
            {profile.phone}
          </p>
          <p className="text-green-500 font-bold">
            <span className="material-symbols-outlined relative -bottom-2">
              mail
            </span>
            {profile.email}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Profile;
