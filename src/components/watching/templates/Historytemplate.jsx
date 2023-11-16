import Title from "../../account/atoms/Title";
import HistoryForm from "../organisms/HistoryForm";
import { getHistory } from "../../../apis/watching/videos";
import { useQuery } from "@tanstack/react-query";
import VideoSkeleton from "../atoms/Skeleton";

const Historytemplate = () => {
  const { data, isError, error, isLoading } = useQuery(
    ["getHistory"],
    getHistory,
    {
      suspense: true,
    }
  );
  return (
    <>
      <main className="w-[58%] mx-auto my-16 flex flex-col justify-center items-center">
        <div className="w-full">
          <Title className="text-base text-paragraph">Watched Recently</Title>
          <Title className="mb-4">History</Title>
          <div className="space-y-8">
            {isLoading ? (
              <VideoSkeleton />
            ) : (
              <HistoryForm data={data?.data?.data} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Historytemplate;
