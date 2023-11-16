import Title from "../atoms/Title";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { codeToName } from "../../../utils/account/country";
import { profileImageAtom } from "../../../store/index";
import { useAtom } from "jotai";

const KeyValueComponent = ({ keyName, value }) => (
  <div className="flex justify-between">
    <p className="text-green-700">
      <span className="material-symbols-outlined relative -bottom-1">
        check_circle
      </span>
      {keyName}
    </p>
    <p>{value}</p>
  </div>
);

const InformationForm = ({ data }) => {
  const info = data?.data?.data;
  const [defaultProfileImage] = useAtom(profileImageAtom);
  const navigate = useNavigate();

  const userInfo = [
    {
      keyName: "Name",
      value: `${info?.firstName || ""} ${info?.lastName || ""}`,
    },
    { keyName: "Email", value: info?.email },
    { keyName: "Birth", value: info?.birthDate },
    { keyName: "TEL", value: info?.phone },
    { keyName: "Country", value: codeToName(info?.country) },
    { keyName: "bio", value: info?.introduction },
    { keyName: "Role", value: info?.role },
    { keyName: "Interests", value: info?.categoryList.join(", ") },
  ];

  return (
    <div className="min-w-[50%] flex justify-center items-center flex-col">
      <section className="p-10 border border-2 bg-white w-full">
        <Title className="text-xl mb-5 border-b">
          <img
            className="max-w-[60px] rounded-xl inline-block mb-2 mr-6"
            src={info?.profileImage || defaultProfileImage}
            alt="Profile Image"
          ></img>
          My Information
        </Title>
        {userInfo.map((item, index) => (
          <KeyValueComponent
            key={index}
            keyName={item.keyName}
            value={item.value}
          />
        ))}
      </section>

      <section className="mt-10 mb-10 p-10 border border-2 bg-white w-full">
        <Title className="text-xl mb-5">Update Information</Title>
        <p className="text-gray-500">Go to Edit Information</p>
        <div className="relative w-full flex justify-end">
          <Button
            color="orange"
            size="base"
            onClick={() => navigate("/mypage/information/fix")}
          >
            <span className="material-symbols-outlined relative -bottom-1">
              edit
            </span>
            Edit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default InformationForm;
