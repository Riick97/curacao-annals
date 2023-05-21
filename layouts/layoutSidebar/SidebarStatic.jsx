import React from 'react'
import Link from "next/link";
import Image from "next/image";

import SidebarRow from './SidebarRow'
import SidebarRowExpandable from "./SidebarRowExpandable";
import logo from "/components/gobiernu.png";
import thumbnail from "/components/thumbnail.png";

//TransformFunctions
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StaticSidebar({ navigation }) {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-grow flex-col overflow-y-auto bg-teal-700 pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          {/* <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=300"
            alt="Your Company"
          /> */}
          <Link href={true ? "/Home" : "/"}>
            <div className="flex-shrink-0 flex items-center mr-10 cursor-pointer bg-teal-100 rounded-md h-full w-full -mt-3">
              <div className="w-10 h-10 relative mr-5 my-2 ml-2">
                <Image
                  className={"text-white "}
                  src={logo}
                  layout="fill"
                  objectFit="cover"
                  objectPosition={"50% 57%"}
                  alt=""
                />
              </div>
              <div className="w-32 h-10 relative mr-5 my-2">
                <Image
                  className={"text-white "}
                  src={thumbnail}
                  layout="fill"
                  objectFit="cover"
                  objectPosition={"50% 57%"}
                  alt=""
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigation.map((item, index) =>
              !item.children ? (
                <div key={index}>
                  <SidebarRow item={item} />
                </div>
              ) : (
                <div key={index}>
                  <SidebarRowExpandable item={item} />
                </div>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
