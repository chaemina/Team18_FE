import Historytemplate from "../../components/watching/templates/Historytemplate";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../../components/common/Loader";
import Error from "../../components/account/atoms/Error";

const VideoHistoryPage = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary
          FallbackComponent={(props) => (
            <Error
              error={props.error?.response?.status}
              errorMessage={props.error.message}
            />
          )}
        >
          <Historytemplate />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default VideoHistoryPage;
