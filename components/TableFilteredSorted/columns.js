const getGenres = ({ values }) => {
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

export const columnsConfig = [
  {
    Header: "TV Show",
    columns: [
      {
        Header: "Name",
        accessor: "show.name",
      },
      {
        Header: "Type",
        accessor: "show.type",
      },
    ],
  },
  {
    Header: "Details",
    columns: [
      {
        Header: "Language",
        accessor: "show.language",
      },
      {
        Header: "Genre(s)",
        accessor: "show.genres",
        Cell: ({ cell: { value } }) => getGenres({ values: value }),
      },
      {
        Header: "Runtime",
        accessor: "show.runtime",
        Cell: ({ cell: { value } }) => {
          const hour = Math.floor(value / 60);
          const min = Math.floor(value % 60);
          return (
            <>
              {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
              {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "show.status",
      },
    ],
  },
];
