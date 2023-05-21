import React from 'react'
import Link from "next/link";

//TransformFunctions
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarRow({item}) {
  return (
    <div >
      <Link href={item.href}>
        <a
          className={classNames(
            item.current
              ? "bg-teal-800 text-white"
              : "text-teal-100 hover:bg-teal-600",
            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          )}
        >
          <item.icon
            className="mr-3 h-6 w-6 flex-shrink-0 text-teal-300"
            aria-hidden="true"
          />
          {item.name}
        </a>
      </Link>
    </div>
  );
}
