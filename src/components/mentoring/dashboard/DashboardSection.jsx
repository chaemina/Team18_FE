import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { tabState, userRole } from "../../../constants/mentoring";
import { getUserInfoReq } from "../../../apis/mentoring/post";
import { getPostCountsReq } from "../../../apis/mentoring/connetion";

import TabBar from "./TabBar";
import Fallback from "../../common/Fallback";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import ContactTabMentorSide from "./ContactTabMentorSide";
import ContactTabMenteeSide from "./ContactTabMenteeSide";
import DoneTab from "./DoneTab";

export default function DashboardSection() {
  const [tab, setTab] = useState(tabState.CONTACT);

  const { data: userData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfoReq,
  });

  const { data } = useQuery({
    queryKey: ["postCounts"],
    queryFn: () => getPostCountsReq(),
  });

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[58rem] m-16 flex flex-col space-y-5">
        <h1 className="text-4xl font-bold text-green-700">Dashboard</h1>
        <TabBar currentTab={tab} setTab={setTab} postCounts={data.data.data} />
        <Fallback
          Loader={Loader}
          Error={Error}
          errorMessage="Failed to load dashboard tab"
        >
          {tab === tabState.CONTACT ? (
            userData.data.data.role === userRole.MENTOR ? (
              <ContactTabMentorSide />
            ) : (
              <ContactTabMenteeSide />
            )
          ) : (
            <DoneTab />
          )}
        </Fallback>
      </div>
    </div>
  );
}
