import { instance } from "../instance";
import {
  isMock,
  mockResponse,
  postCountsData,
  ContactsData,
  DonesData,
} from "./mock";

export async function getPostCountsReq() {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(postCountsData);
  } else {
    return await instance.get("contacts/postCounts");
  }
}

export async function getContactConnectionsReq() {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(ContactsData);
  } else {
    return await instance.get("/contacts");
  }
}

export async function getDoneConnectionsReq() {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(DonesData);
  } else {
    return await instance.get("/contacts/done");
  }
}

export async function addConnectionReq(data) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    const { menteeId, mentorId, mentorPostId } = data;
    return await instance.post("/contacts", {
      menteeId,
      mentorId,
      mentorPostId,
    });
  }
}

export async function deleteConnectionReq(cids) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    const queryParam = cids
      .reduce((acc, cid) => `${acc}${cid},`, "?connectionId=")
      .slice(0, -1);
    return await instance.delete(`/contacts${queryParam}`);
  }
}

export async function acceptConnectionReq(cids) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    const reqData = cids.reduce(
      (acc, cid) => [...acc, { connectionId: cid }],
      []
    );
    return await instance.post("/contacts/accept", reqData);
  }
}

export async function refuseConnectionReq(cids) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    const reqData = cids.reduce(
      (acc, cid) => [...acc, { connectionId: cid }],
      []
    );
    return await instance.patch("/contacts/refuse", reqData);
  }
}
