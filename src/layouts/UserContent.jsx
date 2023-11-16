// import React from "react";
// import { Outlet } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getUser } from "../apis/user";
// import Loader from "../components/common/Loader";
// import GNB from "../layouts/GNB";
// import Footer from "./Footer";
// export const UserContent = () => {
//   const { data, isLoading, isError, error } = useQuery(["getUser"], getUser, {
//     enabled: true,
//   });

//   if (isLoading) {
//     return <Loader />;
//   }

//   // 401 에러 (토큰 만료) 시 에러 처리 필요
//   if (isError) {
//     throw error;
//   }

//   const profileImage = data?.data?.data?.profileImage;

//   return (
//     <div className="relative">
//       <GNB profileImage={profileImage} />
//       <main className="pt-20 pb-20 min-h-screen bg-green-100 flex flex-col">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// };
