import { instance } from "./instance";

export const userInfo = () => {
  return instance.get("/profiles");
};

export const simpleUserInfo = () => {
  return instance.get("/profiles/simple");
};

export const editInfo = (formData) => {
  return instance.put("/profiles", formData);
};

export const getProfileById = (id) => {
  if (!id) {
    throw Error("User could not be found.");
  }
  return instance.get("/profiles/" + id);
};
