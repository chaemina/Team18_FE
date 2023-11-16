// isMock가 true일 경우 통신에 mock 데이터를 사용함
export const isMock = false;

const IMAGE_URL =
  "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400";

export const mockResponse = (data) => ({
  data: { status: "success", data: data, message: null },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
  request: {},
});

export const userData = {
  id: 1,
  profileImage: IMAGE_URL,
  firstName: "John",
  listName: "Doe",
  country: "US",
  role: "MENTOR",
  categoryList: ["IDOL", "Game"],
  birthDate: "2002-10-30",
};

export const postsData = [1, 2, 3].map(() => ({
  postId: 1,
  title: "글 제목",
  content: "글 내용의 첫 번째 줄입니다...",
  postState: "ACTIVE",
  writerDTO: {
    mentorId: 1,
    profileImage: IMAGE_URL,
    name: "John Doe",
    country: "US",
    role: "MENTOR",
    interests: ["IDOL", "Game"],
    birthDate: "2002-10-30",
  },
}));

export const postData = {
  postId: 1,
  title: "글 제목",
  content: `글 내용의 첫 번째 줄입니다. 두 번째 줄입니다. 세 번째 줄입니다.`,
  postState: "ACTIVE",
  writerDTO: {
    mentorId: 1,
    profileImage: IMAGE_URL,
    name: "John Doe",
    country: "US",
    role: "MENTOR",
    interests: ["IDOL", "Game"],
    // birthDate: "2002-10-30",
  },
  connections: [
    {
      connectionId: 1,
      state: "AWAIT",
      mentee: {
        menteeId: 2,
        name: "Jane",
        profileImage: IMAGE_URL,
        country: "DK",
        interests: ["Game", "Sports"],
        role: "MENTEE",
        birthDate: "1999-07-16",
      },
    },
    {
      connectionId: 2,
      state: "ACCEPT",
      mentee: {
        menteeId: 3,
        name: "Miho",
        profileImage: IMAGE_URL,
        country: "JP",
        interests: ["Game", "K-POP"],
        role: "MENTEE",
        birthDate: "2007-03-25",
      },
    },
    {
      connectionId: 3,
      state: "REFUSE",
      mentee: {
        menteeId: 4,
        name: "Michael",
        profileImage: IMAGE_URL,
        country: "US",
        interests: ["Sports", "Movie"],
        role: "MENTEE",
        birthDate: "1985-11-15",
      },
    },
  ],
};

export const postCountsData = { contactCount: 3, doneCount: 3 };

export const ContactsData = [1, 2, 3].map((val) => ({
  postId: 1,
  title: "글 제목",
  writerDTO: {
    mentorId: 1,
    profileImage: IMAGE_URL,
    name: "John Doe",
    country: "US",
    birthDate: "2002-10-30",
    role: "MENTOR",
    favorites: ["IDOL", "Game"],
  },
  // mentee용
  connectionId: val,
  // mentor용
  mentees: [
    {
      connectionId: 1,
      state: "AWAIT",
      mentee: {
        menteeId: 2,
        profileImage: IMAGE_URL,
        name: "Jane",
        country: "DK",
        birthDate: "1999-07-16",
        role: "MENTEE",
        favorites: ["Game", "Sports"],
      },
    },
    {
      connectionId: 2,
      state: "ACCEPT",
      mentee: {
        menteeId: 3,
        profileImage: IMAGE_URL,
        name: "Miho",
        country: "JP",
        birthDate: "2007-03-25",
        role: "MENTEE",
        favorites: ["Game", "K-POP"],
      },
    },
    {
      connectionId: 3,
      state: "REFUSE",
      mentee: {
        menteeId: 4,
        profileImage: IMAGE_URL,
        name: "Michael",
        country: "US",
        birthDate: "1985-11-15",
        role: "MENTEE",
        favorites: ["Sports", "Movie"],
      },
    },
  ],
}));

export const DonesData = [1, 2, 3].map((val) => ({
  postId: 1,
  title: "글 제목",
  mentor: {
    mentorId: 1,
    profileImage: IMAGE_URL,
    name: "John Doe",
    country: "US",
    birthDate: "2002-10-30",
    role: "MENTOR",
    favorites: ["IDOL", "Game"],
  },
  mentees: [
    {
      doneId: 1,
      mentee: {
        menteeId: 2,
        profileImage: IMAGE_URL,
        name: "Jane",
        birthDate: "1999-07-16",
        country: "DK",
        role: "MENTEE",
        favorites: ["Game", "Sports"],
      },
    },
    {
      doneId: 2,
      mentee: {
        menteeId: 3,
        profileImage: IMAGE_URL,
        name: "Miho",
        country: "JP",
        birthDate: "2007-03-25",
        role: "MENTEE",
        favorites: ["Game", "K-POP"],
      },
    },
    {
      doneId: 3,
      mentee: {
        menteeId: 4,
        profileImage: IMAGE_URL,
        name: "Michael",
        country: "US",
        birthDate: "1985-11-15",
        role: "MENTEE",
        favorites: ["Sports", "Movie"],
      },
    },
  ],
}));

export const mutateRes = { postId: 1 };
