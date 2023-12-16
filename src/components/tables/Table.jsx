"use client";

// NOTE: Relies on the fact that data is formatted as an array of objects
const Table = ({ data = [], tableHeader = "" }) => {
  if (data.length === 0) {
    return (
      <h3 className="fs-4 text-center w-100 mt-3">Nothing to see here...</h3>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <section className="border border-2 rounded">
      <h3 className="fs-4 text-center w-100 mt-3">{tableHeader}</h3>
      <section className="table-container">
        <table className="table">
          <thead>
            <tr className="text-center">
              {columns.map((key, index) => (
                <th scope="col" key={index}>
                  {key.toLocaleUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "table-light" : "table-white"
                } text-center`}
              >
                {columns.map((key, colIndex) => (
                  <td key={colIndex}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Table;
