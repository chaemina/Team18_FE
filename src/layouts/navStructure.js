export const navStructure = [
  {
    mainNav: "Watching",
    mainUrl: "videos",
    sub: [
      { subNav: "Video", url: ["videos"] },
      { subNav: "History", url: ["videos/history"] },
    ],
    subPadding: "pl-[3.7rem]",
  },
  {
    mainNav: "Mentoring",
    mainUrl: "mentoring",
    sub: [
      {
        subNav: "List",
        url: [
          "mentoring/posts",
          "mentoring/post",
          "mentoring/write",
          "mentoring/edit",
        ],
      },
      { subNav: "Dashboard", url: ["mentoring/dashboard"] },
    ],
    subPadding: "pl-[9.5rem]",
  },
  {
    mainNav: "Chatting",
    mainUrl: "chatting",
    sub: [
      {
        subNav: "Open Chatting",
        url: [
          "chatting/rooms",
          "chatting/roomprofile",
          "chatting/room",
          "chatting/create",
        ],
      },
    ],
    subPadding: "pl-[16rem]",
  },
  {
    mainNav: "My Page",
    mainUrl: "mypage",
    sub: [
      {
        subNav: "Profile",
        url: ["mypage/profiles"],
      },
      {
        subNav: "Information",
        url: ["mypage/information", "mypage/information/fix"],
      },
    ],
    subPadding: "pl-[20.7rem]",
  },
];
