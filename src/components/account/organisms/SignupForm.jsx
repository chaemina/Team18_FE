import { InputBox } from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import COUNTRY from "../constants/COUNTRY";
import { register, emailCheck } from "../../../apis/user";
import RadioButton from "../atoms/RadioButton";
import BasicDatePicker from "../atoms/DatePicker";
import SelectTag from "../atoms/SelectTag";
import { useNavigate } from "react-router-dom";
import { nameToCode } from "../../../utils/account/country";
import Title from "../atoms/Title";
import Toast from "../../common/Toast";
import ToastError from "../../common/ToastError";

const SignupForm = ({ inputProps }) => {
  const navigate = useNavigate();
  const methods = useForm();
  const { watch, control, handleSubmit, setError, clearErrors } = methods;
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const phone = watch("phone");
  const password = watch("password");
  const passwordCheck = watch("passwordcheck");
  const birthDate = watch("birthDate");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openToastError, setOpenToastError] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");

  const [country, setCountry] = useState("United States");

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState("MENTOR");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const [categoryList, setCategoryList] = useState(["K-POP", "Game"]);

  const handlecategoryList = (newCategoryList) => {
    setCategoryList(newCategoryList);
  };

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpenToastError(false);
      setOpen(false);
    }
  };

  const handleOk = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
      navigate("/");
    }
  };
  const handleEmailConfirm = async (email) => {
    try {
      const response = await emailCheck(email);

      console.log("Response:", response);
      return true;
    } catch (error) {
      if (error?.response?.data?.status === "fail") {
        setError(
          "email",
          { message: "User using this email already exists" },
          { shouldFocus: true }
        );
        return false;
      }
      return false;
    }
  };

  const handlePasswordConfirm = () => {
    if (password && passwordCheck) {
      if (password !== passwordCheck) {
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

  const onSubmit = async () => {
    try {
      //email과 password 값 유효 먼저 체크
      const emailIsValid = await handleEmailConfirm(email);
      const passwordIsValid = await handlePasswordConfirm(password);

      if (emailIsValid && passwordIsValid) {
        // age format 생년월일 문자열로 변환하여 전달
        let birth = null;
        if (birthDate && birthDate.$d) {
          birth = birthDate.format("YYYY-MM-DD");
        }

        const response = await register({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
          country: nameToCode(country),
          birthDate: birth,
          categoryList: categoryList,
          phone: phone,
          introduction: null,
          profileImage: null,
        });

        if (response?.data?.status === "success") {
          // 성공적으로 회원가입한 경우 메인 페이지로 이동
          setOpen(true);
          setMessage("Sign up Success");
          setSeverity("success");
          setTimeout(() => {
            handleOk();
          }, 2000);
        } else {
          // 회원 가입 실패
          setOpenToastError(true);
          setToastErrorMessage("Sign up failed");
          console.error("sign up failed", error);
        }
      } else {
        // email과 password 검사 실패
        setOpenToastError(true);
        setToastErrorMessage("Sign up failed");
        console.log(error);
      }
    } catch (error) {
      // setOpen(true);
      // setMessage("Sign up failed");
      // setSeverity("error");
      setOpenToastError(true);
      setToastErrorMessage(error?.response?.data?.message || "Sign up failed");
      const errors = error?.response?.data?.data;
      Object.entries(errors).forEach(([key, message]) => {
        console.log(`${key}: ${message}`);
      });

      console.error("register request failed", error);
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
            placeholder={inputField.placeholder}
            error={fieldState.invalid}
            helperText={fieldState.invalid ? fieldState.error.message : ""}
            triggerValidation={methods.trigger}
          />
        )}
      />
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="max-w-[500px]">
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
                  value={birthDate}
                />
              )}
            />
            <RadioButton
              name="role"
              value="MENTOR"
              type="radio"
              checked={role === "MENTOR"}
              onChange={handleRoleChange}
              inputProps={{ "aria-label": "MENTOR" }}
            >
              Mentor
            </RadioButton>
            <RadioButton
              name="role"
              value="MENTEE"
              type="radio"
              checked={role === "MENTEE"}
              onChange={handleRoleChange}
              inputProps={{ "aria-label": "MENTEE" }}
            >
              Mentee
            </RadioButton>
            <Dropdown
              name="country"
              options={COUNTRY.map((country) => country.name)}
              selected={country}
              onSelectedChange={handleOptionChange}
            />
            <section className="mt-10 mb-10">
              <Title className="mb-10">Choose Your Favorites!</Title>
              <SelectTag
                id="categoryList"
                name="categoryList"
                selected={categoryList}
                onSelectedChange={handlecategoryList}
              />
            </section>
            <Button color="orange" size="xl">
              Sign Up
            </Button>
          </div>
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

export default SignupForm;
