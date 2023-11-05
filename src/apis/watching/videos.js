// export const getVideos = (page = 0) => {
//   return instance.get("/videos/main" +"?category=" + category+ "?page=" + page);
// };

// export const getUserVideos = () => {
//   return instance.get("/videos/interest")
// }; 토큰만 보내기

// videos/main mock api
// 카테고리/ 페이지 별 조회
import { mockVideo } from "./mockVideo";
import { mockDetailVideo } from "./mockVideo";

export const getVideos = {
  fetchPostingsListWithScroll: async (requestedPage) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const page = mockVideo[requestedPage];

    if (page) {
      const responseVideos = {
        response: page.data.response,
      };

      return {
        message: "successful",
        videos: responseVideos,
        last: page.last,
        success: true,
      };
    }
    return {
      message: "Page not found",
      videos: [],
      success: false,
    };
  },
};

// 사용자 선택 카테고리 요청 api - 토큰을 헤더에 담아보냄

// video/:videoId mock api
// 임시 videoId로 비디오 판별

export const getDetailVideo = async (videoId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const video = mockDetailVideo[videoId];

  if (!video) {
    return null;
  }

  return {
    message: "successful",
    video: video,
    success: true,
  };
};
