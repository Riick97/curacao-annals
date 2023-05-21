import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

export default function TableHead({ headerGroups }) {
  return (
    <thead className="bg-gray-50">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, index) => {
            const isFirst = index === 0
            const normalFirst = `py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6`
            const normal = `px-3 py-3.5 text-left text-sm font-semibold text-gray-900`;
            const chevronNonActive = `invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible`;
            const chevronActive = `ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300`
            const isSortedDesc = column.isSorted && column.isSortedDesc;
            const isSortedAsc = column.isSorted && !column.isSortedDesc;

            return (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={`${isFirst && normalFirst} ${!isFirst && normal}`}
                // className={
                //   "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" +
                //   column.isSorted
                //     ? column.isSortedDesc
                //       ? "sort-desc"
                //       : "sort-asc"
                //     : ""
                // }
              >
                <a className="group inline-flex">
                  {column.render("Header")}{" "}
                  <span
                    className={`${
                      !isSortedDesc && !isSortedAsc && chevronNonActive
                    } ${(isSortedDesc || isSortedAsc) && chevronActive} `}
                  >
                    {!isSortedDesc && (
                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                    {isSortedDesc && (
                      <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </a>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
