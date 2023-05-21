import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

import MobileSidebar from "./SidebarMobile";
import StaticSidebar from "./SidebarStatic";
import Footer from "./Footer";
import Navbar from "./Navbar";


import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";



const userNavigation = [];


export default function LayoutSidebar({ children }) {
  //StateVariables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname, asPath } = useRouter();
  const [open, setOpened] = useState(true);
  const pageName = asPath.split("/").reverse()[0];

  //Constants
  const testing = process.env.TESTING_ENV === "true";
  const connectionString = process.env.DATABASE_URL || "empty";
  const databaseName = connectionString
    ?.split(";database=")[1]
    ?.split(";user")[0];
  const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  //Constants
  const navigation = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      current: ["/", "/pageAnalyticsDemographics"].includes(pathname),
      children: [
        { name: "Requests Analytics", href: "/" },
        { name: "Demographics", href: "/pageAnalyticsDemographics" },
      ],
    },
    {
      name: "Applicants",
      icon: UsersIcon,
      current: pathname === "/pageApplicants",
      children: [{ name: "All Applicants", href: "/pageApplicants" }],
    },
    {
      name: "Requests",
      icon: FolderIcon,
      current: ["/pageExamBundleRequests"].includes(pathname),
      children: [{ name: "All Requests", href: "/pageExamBundleRequests" }],
    },
    // {
    //   name: "Call Letters",
    //   icon: FolderIcon,
    //   current: false,
    //   children: [
    //     { name: "Old Candidates", href: "#" },
    //     { name: "Cito Candidates", href: "#" },
    //   ],
    // },
    {
      name: "Result Letters",
      icon: FolderIcon,
      current: [
        "/pageResultsLettersNewCandidates",
        "/pageResultsLettersOldCandidates",
      ].includes(pathname),
      children: [
        { name: "New Candidates", href: "/pageResultsLettersNewCandidates" },
        { name: "Old Candidates", href: "/pageResultsLettersOldCandidates" },
      ],
    },
  ];

  //EffectFunctions
  Router.onRouteChangeStart = () => {
    NProgress.start();
  };
  Router.onRouteChangeComplete = () => {
    // if (state.mobile) setOpened(false);
    NProgress.done();
    document.querySelector("body").scrollTop = 0;
  };
  Router.onRouteChangeError = () => {
    NProgress.done();
  };

  //TransformFunctions
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Head>
        <title>{pageName ? capitalize(pageName) : "Home"} | My Page</title>
      </Head>
      {/* Banner */}
      {/* {testing && (
        <div className="p-1  bg-teal-300">
          ETE Portal: Running In Developer Mode - Database connnected:{" "}
          {`${databaseName}`} - API Url: {`${frontEndUrl}`}
        </div>
      )} */}
      <>
        <div>
          {/* MobileSidebar */}
          <MobileSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            navigation={navigation}
          />

          {/* Static sidebar for desktop */}
          <StaticSidebar navigation={navigation} />

          {/* Content Column */}
          <div className="flex flex-1 flex-col md:pl-64">
            {/* Navbar */}
            <Navbar
              userNavigation={userNavigation}
              setSidebarOpen={setSidebarOpen}
            />
            {children}
          </div>
        </div>
      </>

      {/* <Footer /> */}
    </>
  );
}
