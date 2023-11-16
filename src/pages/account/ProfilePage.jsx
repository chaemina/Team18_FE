import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProfileTemplate from "../../components/account/templates/ProfileTemplate";
import Loader from "../../components/account/atoms/Loader";
import Error from "../../components/account/atoms/Error";

const ProfilePage = () => {
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
          <ProfileTemplate />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default ProfilePage;
