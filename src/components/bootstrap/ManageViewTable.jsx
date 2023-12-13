"use client";
import CustomButton from "../interaction/inputs/CustomButton";
import { useState } from "react";
import { alertService } from "@/services/alertService";
import { dbConnectService } from "@/services/dbConnectService";
import { connectService } from "@/services/connectService";

const ManageViewTable = ({
  data,
  tableHeader,
  setModal,
  tableType,
  ...props
}) => {
  const [updateRow, setUpdateRow] = useState({});
  const [deleteRowState, setDeleteRowState] = useState(null);
  const [updateRowState, setUpdateRowState] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (data.length === 0) {
    return (
      <h3 className="fs-4 text-center w-100 mt-3">No Data Found or Retrieved...</h3>
    );
  }

  const columns = Object.keys(data[0]);

  function handleDelete(index, row) {
    if (tableType === "manageDBConnections") {
      handleDeleteDBConnection(index, row);
    } else if (tableType === "manageDataRows") {
      handleDeleteRow(index, row);
    } else if (tableType === "manageTables") {
      handleDeleteTable(index, row);
    }
  }

  // TODO: implement removing actual row from actual table (in this case it would be the data property) -- HINT: need to pass down set function related to data
  function handleDeleteDBConnection(index, row) {
    setModal({
      modalMsg: `Are you sure you want to delete this connection? Once submitted this action cannot be reversed.`,
      modalBtnActionName: "Delete",
      modalAction: async () => {
        setDeleteRowState(index);
        setDeleteLoading(true);
        await connectService
          .delete(row.id)
          .then((res) => {
            setDeleteLoading(false);
            setDeleteRowState(null);
            alertService.success("Delete Successful!");
          })
          .catch((err) => {
            setDeleteLoading(false);
            setDeleteRowState(null);
            alertService.error("Delete Failed!");
          });
      },
    });
  }

  function handleDeleteRow(index, row) {
    setModal({
      modalMsg: `Are you sure you want to delete this row? Once submitted this action cannot be reversed.`,
      modalBtnActionName: "Delete",
      modalAction: async () => {
        setDeleteRowState(index);
        setDeleteLoading(true);
        await dbConnectService
          .deleteTableRow(row)
          .then((res) => {
            setDeleteLoading(false);
            setDeleteRowState(null);
            alertService.success("Delete Successful!");
          })
          .catch((err) => {
            setDeleteLoading(false);
            setDeleteRowState(null);
            alertService.error("Delete Failed!");
          });
      },
    });
  }

  function handleDeleteTable(index, row) {
    // TODO: implement table to use this function
    setModal({
      modalMsg: `Are you sure you want to delete this table? Once submitted this action cannot be reversed.`,
      modalBtnActionName: "Delete",
      modalAction: async () => {
        setDeleteRowState(index);
        setDeleteLoading(true);
        await dbConnectService
          .deleteTable(row.table_name)
          .then((res) => {
            setDeleteLoading(false);
            setDeleteRowState(null);
            alertService.success("Delete Successful!");
          })
          .catch((err) => {
            setDeleteLoading(false);
            setDeleteRowState(null);
            alertService.error("Delete Failed!");
          });
      },
    });
  }

  function handleUpdate(index, row) {
    if (tableType === "manageDBConnections") {
      handleUpdateDBConnection(index, row);
    } else if (tableType === "manageDataRows") {
      handleUpdateRow(index, row);
    } else if (tableType === "manageTables") {
      handleUpdateTable(index, row);
    }
  }

  function handleUpdateDBConnection(index, row) {
    setUpdateRowState(index);
    setModal({
      modalMsg: `Updating the connection string is not supported. If you want to make changes, delete this connection info and reenter the information into the connection form.`,
      modalBtnActionName: "Close",
      modalAction: async () => {
        setUpdateRowState(null);
      },
    });
  }

  function handleUpdateRow(index, row) {
    setUpdateRowState(index);
    setModal({
      modalMsg: `Are you sure you want to update this row? Once submitted this action cannot be reversed.`,
      modalBtnActionName: "Update",
      modalAction: async () => {
        setUpdateLoading(true);
        await dbConnectService
          .updateTableRow(updateRow, row)
          .then((res) => {
            setUpdateLoading(false);
            setUpdateRowState(null);
            alertService.success("Update Successful!");
          })
          .catch((err) => {
            setUpdateLoading(false);
            setUpdateRowState(null);
            alertService.error("Update Failed!");
          });
      },
    });
  }

  function handleUpdateTable(index, row) {
    setUpdateRowState(index);
    alert(
      "moving to updating table form where columns can be updated, deleted and added, and table name can be updated"
    );
  }

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
                      handleDelete(rowIndex, row);
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
                          handleUpdate(rowIndex, row);
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
        </table>
      </section>
    </>
  );
};

export default ManageViewTable;
