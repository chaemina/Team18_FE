import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { uidAtom } from "../../../store";
import { getUserInfoReq, getPostReq } from "../../../apis/mentoring/post";
import { userRole, postState } from "../../../constants/mentoring";

import PostDoneSide from "./PostDoneSide";
import PostMenteeSide from "./PostMenteeSide";
import PostMentorSide from "./PostMentorSide";

export default function PostSection() {
  const { postId } = useParams();
  const uid = useAtomValue(uidAtom);

  const { data: userData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfoReq,
    enabled: !!uid,
  });

  const { data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostReq(postId),
  });

  return data.data.data.postState === postState.DONE ? (
    <PostDoneSide data={data.data.data} />
  ) : !uid || userData.data.data.role === userRole.MENTEE ? (
    <PostMenteeSide data={data.data.data} />
  ) : uid === data.data.data.writerDTO.mentorId ? (
    <PostMentorSide data={data.data.data} />
  ) : (
    <PostDoneSide data={data.data.data} />
  );
}
