import React from 'react'

export default function TableBody({ getTableBodyProps, rows, prepareRow }) {
  return (
    <tbody
      className="divide-y divide-gray-200 bg-white"
      {...getTableBodyProps()}
    >
      {rows.map((row, i) => {
        const classFirst = `whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6`;
        const classNormal = `whitespace-nowrap px-3 py-4 text-sm text-gray-500`;
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell, index) => {
              const isFirst = index === 0
              return (
                <td
                  className={`${isFirst && classFirst} ${
                    !isFirst && classNormal
                  }`}
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
