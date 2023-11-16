import { useQuery } from "@tanstack/react-query";

import { getProfileById } from "../../../apis/mypage";

import Profile from "../../account/molecules/Profile";

export default function ProfileModal({ uid }) {
  const { data } = useQuery({
    queryKey: ["getProfileById", uid],
    queryFn: () => getProfileById(uid),
  });

  return <Profile data={data} />;
}
