"use client";
import CustomButton from "../interaction/inputs/CustomButton";
import { useState } from "react";

const ManageViewTable = ({ data, tableHeader, ...props }) => {
  const columns = Object.keys(data[0]);
  return (
    <>
      <h3 className="fs-4 text-center w-100 mt-3">{props.tableHeader}</h3>
      <section className="table-container">
        <table className="table">
          <thead>
            <tr className="text-center">
              {columns.map((key, index) => (
                <th scope="col" key={index}>
                  {key.toLocaleUpperCase()}
                </th>
              ))}
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "table-light" : "table-white"
                } text-center`}
              >
                {columns.map((value, index) => (
                  <td key={index}>{row[value]}</td>
                ))}
                <td>
                  <CustomButton
                    className="btn-danger"
                    type="button"
                    actionWord="Delete"
                    onSubmit={() => {
                      console.log("Delete: ", row.id);
                    }}
                  />
                </td>
                <td>
                  <CustomButton
                    className="btn-warning"
                    type="button"
                    actionWord="Update"
                    onSubmit={() => {
                      console.log("Update: ", row.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Add Row to table...</p>
      </section>
    </>
  );
};

export default ManageViewTable;
