import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default function Table({ columns, data }) {
    //StateVariables
  const [filterInput, setFilterInput] = useState("");

  //Constants
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  //StateFunctions
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("show.name", value);
    setFilterInput(value);
  };

  // Render the UI for your table
  return (
    <>
      {/* Row Search */}
      {/* <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      /> */}
      {/* Row Table */}
      <table
        className="min-w-full divide-y divide-gray-300"
        {...getTableProps()}
      >
        {/* Row Head */}
        <TableHead headerGroups={headerGroups} />
        {/* Row Body */}
        <TableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
      </table>
    </>
  );
}
