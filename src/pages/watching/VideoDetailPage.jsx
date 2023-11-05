import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoDetailtemplate from "../../components/watching/templates/VideoDetailtemplate";
import Loader from "../../components/account/atoms/Loader";
import Error from "../../components/account/atoms/Error";

const VideoDetailPage = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary
          FallbackComponent={(props) => (
            <Error errorMessage={props.error.message} />
          )}
        >
          <VideoDetailtemplate />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default VideoDetailPage;
