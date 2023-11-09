import Title from "../atoms/Title";
import Button from "../../common/Button";
import Modal from "../atoms/Modal";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useState } from "react";
import { InputBox } from "../atoms/InputBox";
import { passwordCheck } from "../../../apis/user";
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
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm();
  const { watch, handleSubmit, setError, control } = methods;
  const password = watch("password");

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const handlePasswordConfirm = async (data) => {
    try {
      const response = await passwordCheck(data.password);
      console.log("Response:", response);
      navigate("/mypage/information/fix");
    } catch (error) {
      setError("password", {
        type: "manual",
        message: "Password does not match.",
      });
    }
  };

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
    // { keyName: "Interests", value: info?.categoryList.join(", ") },
  ];

  return (
    <div className="min-w-[50%] flex justify-center items-center flex-col">
      <section className="p-10 border border-2 bg-white w-full">
        <Title className="text-xl mb-5 border-b">
          My Information
          <img
            className="w-7 rounded-full inline-block mb-2 ml-2"
            src={info?.profileImage || defaultProfileImage}
            alt="Profile Image"
          ></img>
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
          <Button color="orange" size="base" onClick={openModalHandler}>
            <span className="material-symbols-outlined relative -bottom-1">
              edit
            </span>
            Edit
          </Button>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handlePasswordConfirm)}>
              <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Title className="text-xl font-semibold mb-4">
                  Edit Personal Information{" "}
                </Title>
                <p className="text-base text-gray-600">
                  Please enter your password for user authentication
                </p>
                <Controller
                  name="password"
                  defaultValue=""
                  control={methods.control}
                  rules={{
                    required: "Please enter your password",
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"\[\]{}\\()|_-])\S{8,16}$/,
                      message:
                        "Password must be within 8-16, including all English case, numbers, and special characters.",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputBox
                      {...field}
                      name="password"
                      control={methods.control}
                      label="Password"
                      variant="filled"
                      type="password"
                      placeholder="Password"
                      error={fieldState.invalid}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                    />
                  )}
                />
                <Button type="submit" color="white" size="sm">
                  confirm
                </Button>
              </Modal>
            </form>
          </FormProvider>
        </div>
      </section>
    </div>
  );
};

export default InformationForm;
