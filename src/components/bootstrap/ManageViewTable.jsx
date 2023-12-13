"use client";
import CustomButton from "../interaction/inputs/CustomButton";
import { useState } from "react";
import { alertService } from "@/services/alertService";
import { dbConnectService } from "@/services/dbConnectService";

const ManageViewTable = ({ data, tableHeader, setModal, ...props }) => {
  const [updateRow, setUpdateRow] = useState({});
  const [deleteRowState, setDeleteRowState] = useState(null);
  const [updateRowState, setUpdateRowState] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "table-light" : "table-white"
                } text-center`}
              >
                {columns.map((key, colIndex) => (
                  <td key={colIndex}>
                    {updateRowState === rowIndex ? (
                      // Needed to integrate custom input component due to needing to
                      // set the value of the input to the current value of the row
                      // and then update the value of the input to the new value
                      <section className="mb-3 form-floating">
                        <input
                          className="form-control"
                          value={updateRow[key]}
                          onChange={(e) => {
                            e.preventDefault();
                            setUpdateRow({
                              ...updateRow,
                              [key]: e.target.value,
                            });
                          }}
                        ></input>
                        <label
                          htmlFor={`${key
                            .replace(" ", "_")
                            .toLowerCase()}Input`}
                        >
                          {key}
                        </label>
                      </section>
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}
                <td>
                  <CustomButton
                    className="btn-danger"
                    type="button"
                    actionWord="Delete"
                    isLoading={deleteLoading && deleteRowState === rowIndex}
                    disabled={updateRowState !== null || deleteLoading}
                    onSubmit={() => {
                      setModal({
                        modalMsg: `Are you sure you want to delete this row? Once submitted this action cannot be reversed.`,
                        modalBtnActionName: "Delete",
                        modalAction: () => {
                          setDeleteRowState(rowIndex);
                          console.log("Delete: ", row.id);
                          setDeleteLoading(true);
                          setTimeout(() => {
                            setDeleteLoading(false);
                            setDeleteRowState(null);
                            alertService.success("Delete Successful!");
                          }, 5000);
                          // call delete api endpoint
                          // once successful remove from table
                          // when loading set loading state of delete button clicked
                          // AND disable all delete and update buttons
                        },
                      });
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  />
                </td>
                <td>
                  {updateRowState === rowIndex ? (
                    <>
                      <CustomButton
                        className="btn-warning mb-2 me-2"
                        type="submit"
                        actionWord="Submit"
                        disabled={updateLoading}
                        isLoading={updateLoading && updateRowState === rowIndex}
                        onSubmit={() => {
                          setUpdateRowState(rowIndex);
                          setModal({
                            modalMsg: `Are you sure you want to update this row? Once submitted this action cannot be reversed.`,
                            modalBtnActionName: "Update",
                            modalAction: () => {
                              console.log("Update: ", row.id);
                              console.log("Update To: ", updateRow);
                              // setUpdateRowState(null);
                              setUpdateLoading(true);
                              setTimeout(() => {
                                setUpdateLoading(false);
                                setUpdateRowState(null);
                                alertService.success("Update Successful!");
                              }, 5000);
                              // call update api endpoint
                              // once successful update table
                              // when loading set loading state of update button clicked
                              // AND disable all delete and update buttons
                            },
                          });
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      />
                      <CustomButton
                        className="btn-warning mb-2 me-2"
                        type="button"
                        actionWord="Cancel"
                        disabled={updateLoading}
                        onSubmit={() => {
                          setUpdateRowState(null);
                        }}
                      />
                    </>
                  ) : (
                    <CustomButton
                      className="btn-warning"
                      type="button"
                      actionWord="Update"
                      disabled={deleteLoading || updateLoading}
                      onSubmit={() => {
                        setUpdateRowState(rowIndex);
                        setUpdateRow(row);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </section>
    </>
  );
};

export default ManageViewTable;
