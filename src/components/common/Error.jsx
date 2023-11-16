import Button from "./Button";

export default function Error({ resetErrorBoundary, errorMessage }) {
  const handleRefreshClick = () => {
    if (resetErrorBoundary) resetErrorBoundary();
    else window.location.reload();
  };

  return (
    <div className="text-center text-green-700 space-y-2">
      <p className="text-2xl font-bold">Sorry, Something went Wrong!</p>
      <p className="pb-4 text-xl">{errorMessage}</p>
      <div className="flex justify-center items-center space-x-2">
        <span className="font-bold">Please click </span>
        <Button color="orange" size="sm" onClick={handleRefreshClick}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
