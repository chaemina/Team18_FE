import React, { useEffect, useState, Suspense } from "react";
import VideoList from "../../components/watching/templates/VideoList";
import UserVideoList from "../../components/watching/templates/UserVideoList";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../../components/common/Loader";
import Error from "../../components/account/atoms/Error";

const VideoListPage = () => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <Error
            error={props.error?.response?.status}
            errorMessage={props.error.message}
          />
        )}
      >
        {token !== null ? (
          <>
            <div className="w-full flex flex-col justify-center items-center">
              <UserVideoList />
              <VideoList />
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col justify-center items-center ">
              <VideoList />
            </div>
          </>
        )}
      </ErrorBoundary>
    </Suspense>
  );
};

export default VideoListPage;
