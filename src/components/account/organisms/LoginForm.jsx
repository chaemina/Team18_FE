import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { InputBox } from "../atoms/InputBox";
import Button from "../../common/Button";
import { login } from "../../../apis/user";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const handleLoginError = (error, setError) => {
  const setFieldError = (field, message) => {
    setError(field, { message }, { shouldFocus: true });
  };

  if (error?.response?.data) {
    const errorMessage = error.response.data.message;
    const errorData = error.response.data.data;
    switch (errorMessage) {
      case "잘못된 이메일입니다.":
        setFieldError(
          "email",
          "You entered the wrong ID. Please check what you have entered again."
        );
        break;
      case "잘못된 비밀번호입니다.":
        setFieldError(
          "password",
          "You entered the wrong PW. Please check what you have entered again."
        );
        break;
      default:
        if (errorData?.email === "이메일을 올바르게 입력해주세요.") {
          setFieldError("email", "Please type in the email format");
        } else if (
          errorData?.password ===
          "영문 대/소문자, 숫자, 특수문자를 포함해주세요."
        ) {
          setFieldError("password", "Please type in the password format");
        } else {
          setFieldError(
            "email",
            "login request failed. please try again later"
          );
          setFieldError(
            "password",
            "login request failed. please try again later"
          );
        }
        break;
    }
  } else {
    setFieldError("email", "error occurred. Please try again later");
    setFieldError("password", "error occurred. Please try again later");
  }
  console.error("login request failed", error);
};

const LoginForm = ({ inputProps }) => {
  const navigate = useNavigate();
  const methods = useForm();
  const { watch, control, handleSubmit, setError } = methods;
  const email = watch("email");
  const password = watch("password");

  const { loginUser } = useLogin();

  const onSubmit = async () => {
    try {
      const response = await login({
        email: email,
        password: password,
      });
      console.log(response);

      if (response?.data?.status === "success") {
        loginUser(response);
        console.log("login success");
        navigate("/");
      } else {
        // 로그인 실패
        setError(
          "email",
          {
            message: "log in failed",
          },
          {
            shouldFocus: true,
          }
        );
        setError(
          "password",
          {
            message: "log in failed",
          },
          {
            shouldFocus: true,
          }
        );
        console.error("log in failed", error);
      }
    } catch (error) {
      handleLoginError(error, setError);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <main className="max-w-[500px]">
          {inputProps.map((inputField) => (
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
                  helperText={
                    fieldState.invalid ? fieldState.error.message : ""
                  }
                  triggerValidation={methods.trigger}
                />
              )}
            />
          ))}
          <Button color="orange" size="xl" type="submit">
            Log In
          </Button>
        </main>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
