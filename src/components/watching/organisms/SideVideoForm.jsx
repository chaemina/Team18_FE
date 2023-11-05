import Title from "../../account/atoms/Title";

const SideVideoForm = () => {
  return (
    <>
      <div className="flex flex-col h-full w-full items-center space-y-6">
        <div className="w-full text-center">
          <Title className="mt-10 text-xl">Related Videos</Title>
        </div>
        <div className="h-[80%] w-[80%] border-2"></div>
      </div>
    </>
  );
};

export default SideVideoForm;
