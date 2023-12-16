"use client";
import Page from "../bootstrap/Page";
import { useContext } from "react";
import { QueryResultsContext } from "@/components/context/QueryResultsContext";
import Table from "@/components/tables/Table";
import CustomButton from "@/components/interaction/inputs/CustomButton";

const DataView = ({ setModal }) => {
  const { rowData, setRowData } = useContext(QueryResultsContext);
  return (
    <Page>
      <h1 className="text-center">View Selected Data</h1>
      <Table
        data={rowData.map((connection) => {
          return {
            ...connection,
            Delete: (
              <CustomButton
                className="btn-danger"
                type="button"
                actionWord="Delete"
                onSubmit={() => {
                  // console.log("Delete Connection. ID: " + connection.id);
                  // TODO: complete this functionality for deleteing a table row
                  // setModal
                  // if delete button on modal clicked then delete row
                  // and remove the related data from rowData context
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
                onSubmit={() => {
                  // console.log("Update Connection. ID: " + connection.id);
                  // TODO: complete this functionality for updating a table row
                  // setModal
                  // if update button on modal clicked then update row
                  // and update the related data from rowData context
                  // in this case Modal will popup with a form to update the row
                  // the text fields will also be populated with the current data
                }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              />
            )
          };
        })}
        tableHeader="Currently saved Database Connections"
      />
    </Page>
  );
};
export default DataView;
