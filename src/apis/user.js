import { instance } from "./instance";
import { mockUsers, mockResponse } from "../components/account/mockUser";

// export const emailCheck = (data) => {
//   const email = data;
//   return instance.post("/users/emailcheck", email);
// };

export const register = (data) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    introduction,
    profileImage,
    country,
    age,
    categoryList,
    phone,
  } = data;

  return instance.post("/users/signup", {
    firstName,
    lastName,
    email,
    password,
    role,
    introduction,
    profileImage,
    country,
    age,
    categoryList,
    phone,
  });
};

// export const login = (data) => {
//   const { email, password } = data;
//   return instance.post("/users/login", {
//     email,
//     password,
//   });
// };

// 백앤드 api 연결 전 까지 mock api 사용 - login
export const login = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 사용자의 email이 mock data의 key 값과 일치하면
  const user = mockUsers[data.email];
  // 패스워드 일치 확인
  if (user && user.password === data.password) {
    const responseUser = {
      uid: user.uid,
    };
    return mockResponse({
      message: "Login successful",
      user: responseUser,
      success: true,
    });
  } else {
    return mockResponse({
      message: "Invalid email or password",
      success: false,
    });
  }
};

// export const getUser = () => {
//   return instance.get("/getUser");
// };

// 백앤드 api 연결 전 까지 mock api 사용 - getUser
// 임시 uid로 사용자 판별

export const getUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const uid = window.localStorage.getItem("uid");
  let user;

  if (uid === "10") {
    user = mockUsers["user@example.com"];
  } else if (uid === "11") {
    user = mockUsers["user2@example.com"];
  }

  if (!user) {
    return null;
  }

  const responseUser = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
  };

  return {
    message: "successful",
    user: responseUser,
    success: true,
  };
};

// 백앤드 api 연결 전 까지 mock api 사용 - emailCheck
export const emailCheck = async (data) => {
  const { email } = data;
  let response;

  // mockUsers 객체에서 이메일 찾기
  if (mockUsers[email]) {
    // 이메일이 존재하면 success: false 리턴
    response = mockResponse({
      success: false,
      message: "Email already exists.",
    });
  } else {
    // 이메일이 존재하지 않으면 success: true 리턴
    response = mockResponse({ success: true, message: "Email is available." });
  }

  return response;
};
