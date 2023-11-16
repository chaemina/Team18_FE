import Button from "../../common/Button";

const Error = ({ error, errorMessage }) => {
  console.log(error);
  console.log(errorMessage);

  return (
    <main className="mt-20 justify-center items-center flex flex-col">
      <div className="p-10 max-w-[500px] text-center">
        <p className="text-4xl font-bold text-red-500">
          Please try again later !
        </p>
        <p className="mt-10 mb-10 font-bold text-gray-400">{errorMessage}</p>
        <Button
          color="white"
          size="xl"
          onClick={() => window.location.reload(true)}
        >
          <span className="material-symbols-outlined relative -bottom-1 text-2xl font-bold">
            refresh
          </span>{" "}
          Page Reload
        </Button>
      </div>
    </main>
  );
};
export default Error;
