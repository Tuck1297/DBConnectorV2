const TableWithRegisteredRadioBtns = ({
  tableData,
  tableHeader,
  register,
  errors,
  registerName,
}) => {
  if (tableData.length === 0){
    return <h3 className="fs-4 text-center w-100 mt-3">No Information Available...</h3>
  }
  const columns = Object.keys(tableData[0]);
  return (
    <>
      <h3 className="fs-4 text-center w-100 mt-3">{tableHeader}</h3>
      <section className="table-container">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th scope="col">To Select</th>
              {columns.map((key, index) => (
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
                className={`${
                  index % 2 === 0 ? "table-light" : "table-white"
                } text-center`}
              >
                <td>
                  <div className="form-check">
                    <input
                      {...register(
                        `${registerName.replaceAll(" ", "_").toLowerCase()}`
                      )}
                      className="form-check-input"
                      type="radio"
                      name={`${registerName
                        .replaceAll(" ", "_")
                        .toLowerCase()}`}
                      id={`${registerName
                        .replaceAll(" ", "_")
                        .toLowerCase()}${index}`}
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
      <div className="text-danger">
        {errors?.[registerName.replace(" ", "_").toLowerCase()]?.message}
      </div>
    </>
  );
};

export default TableWithRegisteredRadioBtns;
