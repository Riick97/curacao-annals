import React from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

//TransformFunctions
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarRowExpandable({ item }) {
  return (
    <Disclosure as="div" className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              item.current
                ? "bg-teal-800 text-white"
                : "text-teal-100 hover:bg-teal-600",
              "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            )}
          >
            <item.icon
              className="mr-3 h-6 w-6 flex-shrink-0 text-teal-400 group-hover:text-teal-500"
              aria-hidden="true"
            />
            <span className="flex-1">{item.name}</span>
            <svg
              className={classNames(
                open ? " text-teal-300 rotate-90" : " text-teal-200",
                "ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-teal-400"
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1">
            {item.children.map((subItem, index) => (
              <Link href={subItem.href} key={index}>
                <Disclosure.Button
                  key={subItem.name}
                  as="a"
                  href={subItem.href}
                  className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-teal-400 hover:bg-teal-100 hover:text-teal-900"
                >
                  {subItem.name}
                </Disclosure.Button>
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
