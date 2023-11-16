import { instance } from "./instance";

export const emailCheck = (data) => {
  const email = data;
  console.log("Request Body:", { email });
  return instance.post("/users/emailcheck", { email });
};

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
    birthDate,
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
    birthDate,
    categoryList,
    phone,
  });
};

export const login = (data) => {
  const { email, password } = data;
  return instance.post("/users/login", {
    email,
    password,
  });
};

export const passwordCheck = (data) => {
  const password = data;
  console.log("Request Body:", { password });
  return instance.post("/users/passwordcheck", {
    password,
  });
};

export const getUser = () => {
  return instance.get("/profiles/simple");
};
