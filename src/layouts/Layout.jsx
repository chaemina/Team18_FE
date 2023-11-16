import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../apis/user";
import Footer from "./Footer";
import GNB from "./GNB";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/common/Loader";
import Error from "../components/account/atoms/Error";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const token = window.localStorage.getItem("token");

  // const { data, isLoading, isError, error } = useQuery(["getUser"], getUser, {
  //   enabled: !!token,
  // });
  // const profileImage = data?.data?.data?.profileImage;

  // if (isLoading) {
  //   return <Loader />;
  // }

  // // 401 에러 (토큰 만료) 시 에러 처리 필요
  // if (isError) {
  //   return (
  //     <Error
  //       error={props.error?.response?.status}
  //       errorMessage={errorMessage}
  //     />
  //   );
  // }

  return (
    <div className="relative">
      <ScrollToTop />
      <GNB profileImage={null} />
      <main className="pt-20 pb-20 min-h-screen bg-green-100 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
