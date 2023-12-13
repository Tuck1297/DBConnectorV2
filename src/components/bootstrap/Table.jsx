const Table = ({ tableData, tableHeader }) => {
  return (
    <>
      <h3 className="fs-4 text-center w-100 mt-3">{tableHeader}</h3>
      <section className="table-container">
        <table className="table">
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key, index) => (
                <th scope="col" key={index}>
                  {key.toLocaleUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "table-light" : "table-white"}`}
              >
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Table;
