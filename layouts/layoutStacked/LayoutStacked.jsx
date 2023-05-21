import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import NavbarMobile from "./NavbarMobile";
import NavbarProfileDropdown from "./NavbarProfileDropdown";
import NavbarMobileMenuButton from "./NavbarMobileMenuButton";
import NavbarLinks from "./NavbarLinks";
import Footer from "./Footer"

import {
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [{ name: "Sign out", href: "#" }];

export default function LayoutSidebar({ children }) {
  //StateVariables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname, asPath } = useRouter();
  const [open, setOpened] = useState(true);
  const pageName = asPath.split("/").reverse()[0];
  const { data: session, status } = useSession();

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
      name: "Search Catalog",
      icon: HomeIcon,
      current: ["/"].includes(pathname),
      href: "/",
      admin: false,
    },
    {
      name: "Catalog",
      icon: HomeIcon,
      current: ["/pageCatalog"].includes(pathname),
      href: "/pageCatalog",
      admin: false,
    },
    {
      name: "Upload Products",
      icon: HomeIcon,
      current: ["/formPageCatalog"].includes(pathname),
      href: "/formPageCatalog",
      admin: true,
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
        <title>Visibuy</title>
      </Head>
      {/* Banner */}
      {/* {testing && (
        <div className="p-1  bg-teal-300">
          ETE Portal: Running In Developer Mode - Database connnected:{" "}
          {`${databaseName}`} - API Url: {`${frontEndUrl}`}
        </div>
      )} */}
      <div className="min-h-screen">
        <div className="min-h-full">
          <div className="bg-gray-800 pb-32">
            <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  {/* Navbar Main */}
                  <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-700">
                      <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                        {/* Navbar Links */}
                        <NavbarLinks
                          navigation={navigation.filter((nav) => {
                            if (session?.user) {
                              return true;
                            }

                            return nav.admin === false;
                          })}
                        />

                        {/* Profile dropdown */}
                        <NavbarProfileDropdown
                          user={user}
                          userNavigation={userNavigation}
                        />

                        {/* Mobile menu button */}
                        <NavbarMobileMenuButton open={open} />
                      </div>
                    </div>
                  </div>

                  {/* Navbar Mobile */}
                  <NavbarMobile
                    user={user}
                    userNavigation={userNavigation}
                    navigation={navigation.filter((nav) => {
              if (session?.user) {
                return true
              } 
              
              return nav.admin === false;
            })}
                  />
                </>
              )}
            </Disclosure>
            <div className="py-14"></div>
          </div>

          <main className="-mt-56">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
