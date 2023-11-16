import { instance } from "../instance";
import {
  isMock,
  mockResponse,
  userData,
  postsData,
  postData,
  mutateRes,
} from "./mock";

export async function getUserInfoReq() {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(userData);
  } else {
    return await instance.get("/profiles/");
  }
}

export async function getPostsReq(category, search, page) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return page < 2 ? mockResponse(postsData) : mockResponse([]);
  } else {
    return await instance.get(
      `/mentorings?category=${category}&search=${search}&page=${page}`
    );
  }
}

export async function getPostReq(postId) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(postData);
  } else {
    return await instance.get(`/mentorings/${postId}`);
  }
}

export async function addPostReq(data) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(mutateRes);
  } else {
    const { title, content } = data;
    return await instance.post("/mentorings", {
      title,
      content,
    });
  }
}

export async function editPostReq(postId, data) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(mutateRes);
  } else {
    const { title, content } = data;
    return await instance.put(`/mentorings/${postId}`, {
      title,
      content,
    });
  }
}

export async function deletePostReq(postId) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.delete(`/mentorings/${postId}`);
  }
}

export async function donePostReq(postId) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.patch(`/mentorings/${postId}/done`, {
      mentorPostStateEnum: "DONE",
    });
  }
}
