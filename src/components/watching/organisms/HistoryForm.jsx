import HistoryCard from "../molecules/HistoryCard";
import Title from "../../account/atoms/Title";
const HistoryForm = ({ data }) => {
  const videos = data;
  console.log(videos?.length);

  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        {videos?.length == 0 ? (
          <p>There is no viewing history</p>
        ) : (
          videos.map((video, index) => (
            <HistoryCard key={index} video={video} />
          ))
        )}
      </main>
    </>
  );
};

export default HistoryForm;
