import Page from "../bootstrap/Page";
import { useState, useContext, useEffect } from "react";
import { ManagePanelContext } from "../context/ManagePanelContext";
import CustomButton from "../interaction/inputs/CustomButton";
import TableWithRegisteredRadioBtns from "../bootstrap/TableWithRegisteredRadioBtns";
import { ConnectionsContext } from "../context/ConnectionsContext";
import { set, useForm } from "react-hook-form";
import { authSchema } from "@/hooks/yupAuth";
import { dbConnectService } from "@/services/dbConnectService";
import { alertService } from "@/services/alertService";
const ManagePanel = () => {
  const { managePanelState, setManagePanelState } =
    useContext(ManagePanelContext);
  const { connectionsData } = useContext(ConnectionsContext);
  const [loading, setLoading] = useState(false);
  const [showTables, setShowTables] = useState(false);
  const [showDBs, setShowDBs] = useState(true);
  const [showTableInfo, setShowTableInfo] = useState(
    managePanelState.tableInfo !== null ? true : false
  );

  function restart() {
    setManagePanelState({
      selectedDB: null,
      selectedTable: null,
      tablesInSelectedDB: [],
      tableInfo: null,
    });
    setShowTables(false);
    setShowDBs(true);
    setShowTableInfo(false);
  }

  const dbSchema = authSchema({ databaseRadioSelection: true });
  const tableSchema = authSchema({ tableRadioSelection: true });

  const {
    register: dbRegister,
    handleSubmit: dbHandleSubmit,
    formState: dbFormState,
    watch: dbWatch,
  } = useForm(dbSchema);

  const {
    register: tableRegister,
    handleSubmit: tableHandleSubmit,
    formState: tableFormState,
    watch: tableWatch,
  } = useForm(tableSchema);
  const { errors: dbErrors } = dbFormState;
  const { errors: tableErrors } = tableFormState;

  function dbOnSubmit(data) {
    setLoading(true);
    dbConnectService
      .getTables(data.databaseradioselection)
      .then((res) => {
        let tables = res.filter((obj, index, array) => {
          const currentIndex = array.findIndex(
            (item) => item.table_name === obj.table_name
          );
          return currentIndex === index;
        });
        tables = tables.map((table) => {
          return { table_name: table.table_name };
        });
        setManagePanelState({
          ...managePanelState,
          selectedDB: data.databaseradioselection,
          tablesInSelectedDB: tables,
        });
        setShowTables(true);
        setShowDBs(false);
        setLoading(false);
      })
      .catch((err) => {
        alertService.error(err);
        setLoading(false);
      });
  }

  function tableOnSubmit(data) {
    setLoading(true);
    dbConnectService
      .getTableColumns(data.tableradioselection)
      .then((res) => {
        console.log("Columns: ",res);
        // TODO: resart here...
        setLoading(false);
        setManagePanelState({
          ...managePanelState,
          selectedTable: data.tableradioselection,
          tableInfo: res,
        });
        setShowTableInfo(true);
        setShowTables(false);
      })
      .catch((err) => {
        alertService.error(err);
        setLoading(false);
      });
  }

  return (
    <Page>
      <h1 className="text-center">Mange</h1>
      {showDBs ? (
        <form onSubmit={dbHandleSubmit(dbOnSubmit)} className="p-2">
          <TableWithRegisteredRadioBtns
            tableData={connectionsData}
            tableHeader="Select a Database..."
            register={dbRegister}
            errors={dbErrors}
            registerName="databaseRadioSelection"
          />
          <CustomButton
            className="w-100 mt-2 mb-2"
            type="submit"
            actionWord="Submit"
            isLoading={loading}
            disabled={loading}
          />
        </form>
      ) : (
        <>
          <CustomButton
            actionWord="Select a different database?"
            type="button"
            onSubmit={() => {
              restart();
            }}
            className="w-100 mt-2 mb-2"
          />
        </>
      )}
      {showTables ? (
        <form onSubmit={tableHandleSubmit(tableOnSubmit)} className="p-2">
          <TableWithRegisteredRadioBtns
            tableData={managePanelState.tablesInSelectedDB}
            tableHeader="Select a Table..."
            register={tableRegister}
            errors={tableErrors}
            registerName="tableRadioSelection"
            valueId="table_name"
          />
          <CustomButton
            className="w-100 mt-2 mb-2"
            type="submit"
            actionWord="Submit"
            isLoading={loading}
            disabled={loading}
          />
        </form>
      ) : (
        <>
          {managePanelState.selectedTable !== null ? (
            <CustomButton
              actionWord="Select a different table?"
              type="button"
              onSubmit={() => {
                setShowTableInfo(false);
                setShowTables(true);
                setManagePanelState({
                  ...managePanelState,
                  selectedTable: null,
                  tableInfo: null,
                });
              }}
              className="w-100 mt-2 mb-2"
            />
          ) : (
            ""
          )}
        </>
      )}
      {showTableInfo ? (
        <>
          <p className="text-center fs-2">
            table information populated in forms with delete, update and other
            buttons and dropdowns and stuff {managePanelState.selectedTable}
          </p>
          <CustomButton
            type="button"
            actionWord="Restart"
            onSubmit={() => {
              restart();
            }}
            className="w-100 mt-2 mb-2"
          />
        </>
      ) : (
        ""
      )}
    </Page>
  );
};

export default ManagePanel;

/*
TODO: 
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
