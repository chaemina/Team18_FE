import SignupTemplate from "../../components/account/templates/Signuptemplate";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../../components/account/atoms/Loader";
import Error from "../../components/account/atoms/Error";

const SignupPage = () => {
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
          <SignupTemplate />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default SignupPage;
