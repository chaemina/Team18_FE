import { instance } from "../instance";
import { mockVideo, mockUserVideo, mockDetailVideo } from "./mockVideo";

export const getVideos = async (pageParam = 0, category) => {
  try {
    const response = await instance.get(
      `/videos/main?category=${category}&page=${pageParam}`
    );

    const videos = response?.data?.data;
    console.log(videos);

    return {
      videos: videos.videoAllResponseDTO,
      nextPage: pageParam + 1,
      isLast: videos.last,
    };
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    throw new Error(error?.response?.data?.message || "Network error");
  }
};

// videos/main mock api
// 카테고리/ 페이지 별 조회

// export const getVideos = {
//   fetchPostingsListWithScroll: async (requestedPage, categoryParam) => {
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     // categoryParam을 사용하여 해당 카테고리의 데이터를 참조합니다.
//     const categoryData = mockVideo[categoryParam];

//     if (categoryData) {
//       // requestedPage를 사용하여 해당 페이지의 데이터를 참조합니다.
//       const page = categoryData[requestedPage];

//       if (page) {
//         const responseVideos = {
//           response: page.data.response,
//         };

//         return {
//           message: "successful",
//           videos: responseVideos,
//           last: page.last,
//           success: true,
//         };
//       }
//     }

//     return {
//       message: "Page not found",
//       videos: [],
//       success: false,
//     };
//   },
// };

// 사용자 선택 카테고리 요청 api - 토큰을 헤더에 담아보냄

export const getUserVideos = () => {
  return instance.get("/videos/interest");
};

// export const getHistory = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 500));

//   const videos = mockUserVideo;

//   if (!videos) {
//     throw new Error("Video not found");
//   }

//   return {
//     message: "successful",
//     data: videos,
//     success: true,
//   };
// };

export const getHistory = () => {
  return instance.get("/videos/history");
};

// video/:videoId mock api
// 임시 videoId로 비디오 판별

export const getDetailVideo = (videoID) => {
  if (!videoID) {
    throw Error(error);
  }
  return instance.get("/videos/" + videoID);
};

// export const getDetailVideo = async (videoId) => {
//   await new Promise((resolve) => setTimeout(resolve, 500));

//   const video = mockDetailVideo[videoId];

//   if (!video) {
//     throw new Error("Video not found");
//   }

//   return {
//     message: "successful",
//     video: video,
//     success: true,
//   };
// };
