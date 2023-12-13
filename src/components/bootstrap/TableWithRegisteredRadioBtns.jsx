const TableWithRegisteredRadioBtns = ({ tableData, tableHeader, register }) => {
  return (
    <>
      <h3 className="fs-4 text-center w-100 mt-3">{tableHeader}</h3>
      <section className="table-container">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th scope="col">To Select</th>
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
                className={`${index % 2 === 0 ? "table-light" : "table-white"} text-center`}
              >
                <td>
                  <div className="form-check">
                    <input
                      {...register(`radioBtn`)}
                      className="form-check-input"
                      type="radio"
                      name={`radioBtn`}
                      id={`radioBtn${index}`}
                      value={row.id}
                    />
                  </div>
                </td>
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

export default TableWithRegisteredRadioBtns;
