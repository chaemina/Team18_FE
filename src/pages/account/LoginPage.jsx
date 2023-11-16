import LoginTemplate from "../../components/account/templates/Logintemplate";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../../components/account/atoms/Loader";
import Error from "../../components/account/atoms/Error";

const LoginPage = () => {
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
          <LoginTemplate />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default LoginPage;
