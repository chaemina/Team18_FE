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
    const storedToken = window.localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <Error errorMessage={props.error.message} />
        )}
      >
        {token !== null ? (
          <>
            <div className="w-full flex flex-col justify-center items-center mt-20">
              <UserVideoList />
              <VideoList />
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col justify-center items-center mt-20">
              <VideoList />
            </div>
          </>
        )}
      </ErrorBoundary>
    </Suspense>
  );
};

export default VideoListPage;
