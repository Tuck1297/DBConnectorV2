import Page from "../bootstrap/Page";
import { useState, useContext, useEffect } from "react";
import { ManagePanelContext } from "../context/ManagePanelContext";
import CustomButton from "../interaction/inputs/CustomButton";
const ManagePanel = () => {
  const { managePanelState, setManagePanelState } =
    useContext(ManagePanelContext);

  function restart() {
    setManagePanelState({
      selectedDB: null,
      selectedTable: null,
      tableInfo: null,
    });
  }

  useEffect(() => {
    setManagePanelState({
      selectedDB: "some database",
      selectedTable: "some table",
      tableInfo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
  }, []);

  return (
    <Page>
      <h1 className="text-center">Mange</h1>
      {managePanelState.selectedDB === null ? (
        <p className="text-center fs-2">select database form</p>
      ) : (
        <>
          <CustomButton
            actionWord="Select a different database?"
            type="button"
            onSubmit={() => {
              restart();
            }}
          />
        </>
      )}
      {managePanelState.selectedTable === null ? (
        <p className="text-center fs-2">select table form</p>
      ) : (
        <>
          <CustomButton
            actionWord="Select a different table?"
            type="button"
            onSubmit={() => {
              setManagePanelState({
                ...managePanelState,
                selectedTable: null,
                tableInfo: null,
              });
            }}
          />
        </>
      )}
      {managePanelState.tableInfo === null ? (
        <p className="text-center fs-2">
          table information populated in forms with delete, update and other
          buttons and dropdowns and stuff
        </p>
      ) : (
        <>
          <CustomButton
            type="button"
            actionWord="Restart"
            onSubmit={() => {
              restart();
            }}
          />{" "}
        </>
      )}
    </Page>
  );
};

export default ManagePanel;


/*
TODO: 
 - Need to integrate in radio button table for database selection and table selection
 - Need to create a new form that will explicitly work with manipulating column and table information
 TO IMPLEMENT IN NEW FORM
 1. Delete a Table
 2. Delete a Database
 3. Remove a column from a table
 4. Add a column to a table
 5. update the name of a column in a table
 6. update the name of a table
 7. Insert one or many new rows into a table

*/