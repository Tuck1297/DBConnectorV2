"use client";
import Page from "../bootstrap/Page";
import { useContext, useState, useRef } from "react";
import { QueryResultsContext } from "@/components/context/QueryResultsContext";
import Table from "@/components/tables/Table";
import CustomButton from "@/components/interaction/inputs/CustomButton";
import UpdateRowForm from "@/components/interaction/form/UpdateRowForm";
import { dbConnectService } from "@/services/dbConnectService";
import { alertService } from "@/services/alertService";

const DataView = ({ setModal }) => {
  const { rowData, setRowData } = useContext(QueryResultsContext);

  const [deleteRowState, setDeleteRowState] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateRowState, setUpdateRowState] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const updateRowRef = useRef();

  function removeRow(index) {
    const newData = [...rowData]
    newData.splice(index, 1);
    setRowData(newData);
  }

  function updateRow(index, row) {
    const newData = [...rowData]
    newData[index] = row;
    setRowData(newData);
  }

  function getUpdateRowData() {
    return updateRowRef.current.getRowState();
  }

  return (
    <Page>
      <h1 className="text-center">View Selected Data</h1>
      <Table
        data={rowData.map((row, index) => {
          return {
            ...row,
            Delete: (
              <CustomButton
                className="btn-danger"
                type="button"
                actionWord="Delete"
                isLoading={deleteLoading && deleteRowState === index}
                disabled={deleteLoading && deleteRowState === index || updateLoading}
                onSubmit={() => {
                  setModal({
                    modalMsg: "Are you sure you want to delete this row?",
                    modalBtnActionName: "Delete",
                    modalAction: async () => {
                      setDeleteRowState(index);
                      setDeleteLoading(true);
                      await dbConnectService.deleteTableRow(row)
                      .then((res) => {
                        setDeleteRowState(null);
                        setDeleteLoading(false);
                        alertService.success("Row Deleted Successfully");
                        removeRow(index);
                      })
                      .catch((err) => {
                        setDeleteLoading(false);
                        setDeleteRowState(null);
                        alertService.error(err);
                      })
                    },
                  });
                }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              />
            ),
            Update: (
              <CustomButton
                className="btn-warning"
                type="button"
                actionWord="Update"
                isLoading={updateLoading && updateRowState === index}
                disabled={updateLoading && updateRowState === index || deleteLoading}
                onSubmit={() => {
                  setModal({
                    modalMsg: <UpdateRowForm ref={updateRowRef} row={row} />,
                    modalBtnActionName: "Update",
                    modalAction: async () => {
                      setUpdateRowState(index);
                      setUpdateLoading(true);
                      await dbConnectService.updateTableRow(getUpdateRowData(), row)
                      .then((res) => {
                        setUpdateLoading(false);
                        setUpdateRowState(null);
                        alertService.success("Row Updated Successfully");
                        updateRow(index, getUpdateRowData());
                      })
                      .catch((err) => {
                        setUpdateLoading(false);
                        setUpdateRowState(null);
                        alertService.error(err);
                      })
                    },
                  });
                }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              />
            )
          };
        })}
        tableHeader=""
      />
    </Page>
  );
};
export default DataView;
