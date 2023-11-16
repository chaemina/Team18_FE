import { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { InputBox, InputOnly } from "../atoms/InputBox";
import Button from "../../common/Button";
import { editInfo } from "../../../apis/mypage";
import Dropdown from "../../common/Dropdown";
import RadioButton from "../atoms/RadioButton";
import SelectTag from "../atoms/SelectTag";
import COUNTRY from "../constants/COUNTRY";
import { useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import BasicDatePicker from "../atoms/DatePicker";
import dayjs from "dayjs";
import { codeToName, nameToCode } from "../../../utils/account/country";
import { passwordCheck } from "../../../apis/user";
import Toast from "../../common/Toast";
import ToastError from "../../common/ToastError";

const InformationFixForm = ({ data, inputProps }) => {
  const info = data?.data?.data;

  const defaultValues = Object.keys(info || {}).reduce((acc, key) => {
    acc[key] = info[key] || "";
    return acc;
  }, {});

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      birthDate: dayjs(info?.birthDate),
    },
  });

  const navigate = useNavigate();
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = methods;
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const phone = watch("phone");
  const password = watch("password");
  const newPassword = watch("newPassword");
  const passwordcheck = watch("passwordcheck");
  const birthDate = watch("birthDate");
  const introduction = watch("introduction");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openToastError, setOpenToastError] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState(info?.profileImage);

  const handleOk = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
      navigate("/mypage/information");
    }
  };

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpenToastError(false);
      setOpen(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const [email, setEmail] = useState(info?.email);

  const [country, setCountry] = useState(codeToName(info?.country));

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState(info?.role);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const [categoryList, setCategoryList] = useState(info?.categoryList);

  const handlecategoryList = (newCategoryList) => {
    setCategoryList(newCategoryList);
  };

  const handleOriginPassword = async (password) => {
    try {
      const response = await passwordCheck(password);

      console.log("Response:", response);
      return true;
    } catch (error) {
      console.log(error);
      setError(
        "password",
        { message: "It's wrong. Enter the existing password you were using" },
        { shouldFocus: true }
      );
      return false;
    }
  };

  const handlePasswordConfirm = () => {
    if (newPassword && passwordcheck) {
      if (newPassword !== passwordcheck) {
        setError(
          "passwordcheck",
          { message: "Passwords do not match" },
          { shouldFocus: true }
        );
        return false;
      } else {
        clearErrors("passwordcheck");
        return true;
      }
    }
  };

  const [changedValues, setChangedValues] = useState({});

  useEffect(() => {
    const submitData = new FormData();

    if (profileImage instanceof File) {
      submitData.append("file", profileImage);
    } else {
      submitData.append("file", profileImage);
    }

    submitData.append(
      "requestDTO",
      new Blob(
        [
          JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            password: newPassword,
            role: role,
            country: nameToCode(country),
            birthDate: birthDate ? dayjs(birthDate).format("YYYY-MM-DD") : "",
            categoryList: categoryList,
            phone: phone,
            introduction: introduction,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    setChangedValues(submitData);
  }, [
    firstName,
    lastName,
    newPassword,
    country,
    birthDate,
    phone,
    role,
    categoryList,
    introduction,
    profileImage,
  ]);
  console.log(profileImage);

  const mutation = useMutation(editInfo, {
    onSuccess: () => {
      setOpen(true);
      setSeverity("success");
      setMessage("Edit Success");
      setTimeout(() => {
        handleOk();
      }, 1500);
    },
    onError: () => {
      setOpenToastError(true);
      setToastErrorMessage("Edit failed");
    },
  });

  const onSubmit = async (formData) => {
    try {
      //email과 password 값 유효 먼저 체크
      const OriginPasswordCheck = await handleOriginPassword(password);
      const passwordIsValid = await handlePasswordConfirm(passwordcheck);

      if (passwordIsValid && OriginPasswordCheck) {
        mutation.mutate(changedValues);
      }
    } catch (error) {
      setOpenToastError(true);
      setToastErrorMessage(error?.response?.data?.message || "Edit failed");
      console.error("Edit", error);
    }
  };

  const renderController = (inputField) => {
    return (
      <Controller
        name={inputField.name}
        key={inputField.name}
        control={methods.control}
        defaultValue=""
        rules={inputField.rules}
        render={({ field, fieldState }) => (
          <InputBox
            {...field}
            id={inputField.name}
            label={inputField.label}
            variant={inputField.variant}
            type={inputField.type}
            multiline={inputField.multiline}
            rows={inputField.rows}
            placeholder={inputField.placeholder}
            error={fieldState.invalid}
            helperText={fieldState.invalid ? fieldState.error.message : ""}
          />
        )}
      />
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <main className="max-w-[500px]">
            <InputOnly readOnly={true} name="email" value={email}></InputOnly>
            <div className="flex gap-10">
              {inputProps
                .filter(
                  (props) =>
                    props.name === "firstName" || props.name === "lastName"
                )
                .map(renderController)}
            </div>
            {inputProps
              .filter(
                (inputField) =>
                  inputField.name !== "firstName" &&
                  inputField.name !== "lastName"
              )
              .map(renderController)}
            <Controller
              name="birthDate"
              control={methods.control}
              render={(field) => (
                <BasicDatePicker
                  {...field}
                  control={methods.control}
                  name="birthDate"
                  value="birthDate"
                />
              )}
            />
            <RadioButton
              name="role"
              value="MENTOR"
              type="radio"
              onChange={handleRoleChange}
              checked={role === "MENTOR"}
            >
              Mentor
            </RadioButton>
            <RadioButton
              name="role"
              value="MENTEE"
              type="radio"
              onChange={handleRoleChange}
              checked={role === "MENTEE"}
            >
              Mentee
            </RadioButton>
            <Dropdown
              name="country"
              options={COUNTRY.map((country) => country.name)}
              onSelectedChange={handleOptionChange}
              selected={country}
              className="bg-white"
            />
            <input
              type="file"
              label="Profile Image Upload"
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <section className=" p-4  mt-10 mb-10">
              <Title className="mb-10">Chooese Your Favorites! </Title>
              <SelectTag
                name="categoryList"
                selected={categoryList}
                onSelectedChange={handlecategoryList}
              />
            </section>
            <div className="flex justify-between">
              <Button
                color="white"
                size="lg"
                onClick={() => navigate("/mypage/information")}
              >
                Cancel
              </Button>
              <Button color="orange" size="lg" type="submit">
                Edit
              </Button>
            </div>
          </main>
        </form>
      </FormProvider>
      {openToastError && (
        <ToastError
          open={openToastError}
          handleClose={handleClose}
          errorMessage={toastErrorMessage}
        />
      )}
      <Toast
        open={open}
        handleClose={handleClose}
        severity={severity}
        message={message}
        autoHideDuration={3000}
      />
    </>
  );
};

export default InformationFixForm;
