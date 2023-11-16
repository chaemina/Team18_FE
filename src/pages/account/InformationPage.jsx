import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Informationtemplate from "../../components/account/templates/Informationtemplate";
import Loader from "../../components/account/atoms/Loader";
import Error from "../../components/account/atoms/Error";

const InformationPage = () => {
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
          <Informationtemplate />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default InformationPage;
